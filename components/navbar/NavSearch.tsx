// 'use client';
// import { Input } from '../ui/input';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';
// import { useState, useEffect } from 'react';

// function NavSearch() {
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();

//   const [search, setSearch] = useState(
//     searchParams.get('search')?.toString() || ''
//   );
//   const handleSearch = useDebouncedCallback((value: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (value) {
//       params.set('search', value);
//     } else {
//       params.delete('search');
//     }
//     replace(`/?${params.toString()}`);
//   }, 500);

//   useEffect(() => {
//     if (!searchParams.get('search')) {
//       setSearch('');
//     }
//   }, [searchParams.get('search')]);

//   return (
//     <Input
//       type='text'
//       placeholder='find a property...'
//       className='max-w-xs dark:bg-muted'
//       onChange={(e) => {
//         setSearch(e.target.value);
//         handleSearch(e.target.value);
//       }}
//       value={search}
//     />
//   );
// }
// export default NavSearch;


'use client';

import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider'; // Import Material-UI Slider

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // State for search input value
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );

  // State for price range
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 10000,
  ]);

  /**
   * Handles the debounced search input
   * Updates the URL with the search query
   */
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/?${params.toString()}`);
  }, 500);

  /**
   * Handles the price range changes
   * Updates the URL with the new price range
   */
  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setPriceRange([min, max]);

    const params = new URLSearchParams(searchParams);
    params.set('minPrice', min.toString());
    params.set('maxPrice', max.toString());
    replace(`/?${params.toString()}`);
  };

  /**
   * Resets the search input and price range whenever searchParams change
   */
  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
    setPriceRange([
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || 10000,
    ]);
  }, [searchParams]);

  return (
    <div className="flex flex-col bg-gray-50 py-6 shadow-md rounded-lg mx-4 space-y-4">
      {/* Search and Price Range Container */}
      <div className="flex items-center justify-center space-x-8">
        
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Find a property..."
          className="w-80 h-12 text-lg rounded-md border border-gray-300 dark:bg-muted focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          value={search}
        />

        {/* Price Range Title */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-600">Price Range</span>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col items-center space-y-2">
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={10}
            className="w-60 text-blue-500"
          />
          <div className="text-sm text-gray-600 font-medium">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>

      </div>
    </div>
  );
}

export default NavSearch;

