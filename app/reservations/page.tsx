import { fetchReservations } from '@/utils/actions';
import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';

import { formatDate, formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Stats from '@/components/reservations/Stats';

async function BookingHistoryPage() {
  const bookingRecords = await fetchReservations();
  if (bookingRecords.length === 0) return <EmptyList />;

  return (
    <>
      <Stats />
      <div className='mt-16'>
        <h4 className='mb-4 capitalize'>
          Total Booking Records: {bookingRecords.length}
        </h4>
        <Table>
          <TableCaption>A summary of recent booking activity.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Accommodation</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration (Nights)</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Arrival Date</TableHead>
              <TableHead>Departure Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingRecords.map((record) => {
              const {
                id,
                orderTotal,
                totalNights,
                checkIn,
                checkOut,
                property: { id: propertyId, name, country },
              } = record;

              const formattedArrival = formatDate(checkIn);
              const formattedDeparture = formatDate(checkOut);
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className='underline text-muted-foreground tracking-wide'
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CountryFlagAndName countryCode={country} />
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{formattedArrival}</TableCell>
                  <TableCell>{formattedDeparture}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
export default BookingHistoryPage;