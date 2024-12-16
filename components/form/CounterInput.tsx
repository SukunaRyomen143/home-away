'use client';
import { Card, CardHeader } from '@/components/ui/card';
import { LuMinus, LuPlus } from 'react-icons/lu';

import { Button } from '../ui/button';
import { useState } from 'react';

function QuantitySelector({
  // Changed component name
  category, // Changed prop name
  initialValue, // Changed prop name
}: {
  category: string;
  initialValue?: number;
}) {
  const [quantity, setQuantity] = useState(initialValue || 0); // Changed variable name

  const incrementQuantity = () => {
    // Changed function name
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    // Changed function name
    setQuantity((prevQuantity) => {
      if (prevQuantity > 0) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  return (
    <Card className='mb-4'>
      <input type='hidden' name={category} value={quantity} />{' '}
      {/* Changed variable name */}
      <CardHeader className='flex flex-col gap-y-5'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col'>
            <h2 className='font-medium capitalize'>{category}</h2>{' '}
            {/* Changed variable name */}
            <p className='text-muted-foreground text-sm'>
              Indicate the quantity of {category}
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={decrementQuantity} // Changed function name
            >
              <LuMinus className='w-5 h-5 text-primary' />
            </Button>
            <span className='text-xl font-bold w-5 text-center'>
              {quantity}
            </span>{' '}
            {/* Changed variable name */}
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={incrementQuantity} // Changed function name
            >
              <LuPlus className='w-5 h-5 text-primary' />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
export default QuantitySelector;