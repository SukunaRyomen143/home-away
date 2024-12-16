import Link from 'next/link';
//import { LuTent } from 'react-icons/lu';
import { SiHomeadvisor } from 'react-icons/si';
import { Button } from '../ui/button';

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <SiHomeadvisor className='w-6 h-6' />
      </Link>
    </Button>
  );
}
export default Logo;
