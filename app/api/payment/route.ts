import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/utils/db';
import { formatDate } from '@/utils/format';

// Initialize Stripe outside the handler for efficiency
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const requestHeaders = new Headers(req.headers);
    const origin = requestHeaders.get('origin');
    const { bookingId } = await req.json();

    if (!bookingId) {
        return NextResponse.json({ error: 'Missing bookingId in request body' }, { status: 400 });
      }
    
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        property: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const {
      totalNights,
      orderTotal,
      checkIn,
      checkOut,
      property: { image, name },
    } = booking;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { bookingId: booking.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: name, // Directly use name
              images: [image],
              description: `Stay in this wonderful place for ${totalNights} nights, from ${formatDate(
                checkIn
              )} to ${formatDate(checkOut)}. Enjoy your stay!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error('Error during payment processing:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session', details: error.message },
      { status: 500 }
    );
  }
};