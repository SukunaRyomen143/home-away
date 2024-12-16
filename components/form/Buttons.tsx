'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPenSquare } from 'react-icons/lu';

type ButtonSize = 'default' | 'lg' | 'sm';

type FormSubmitButtonProps = {
  className?: string;
  label?: string; // Changed 'text' to 'label'
  size?: ButtonSize;
};

export function FormSubmitButton({
  className = '',
  label = 'submit', // Changed 'text' to 'label'
  size = 'lg',
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      className={`capitalize ${className} `}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        label // Changed 'text' to 'label'
      )}
    </Button>
  );
}

export const ModalSignInButton = () => {
  // Changed component name
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const FormToggleButton = ({
  isToggled,
}: {
  isToggled: boolean;
}) => {
  // Changed component name and prop
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isToggled ? ( // Changed prop name
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

type ActionType = 'modify' | 'remove'; // Changed type name
export const ActionIconButton = ({
  actionType,
}: {
  actionType: ActionType;
}) => {
  // Changed component name
  const { pending } = useFormStatus();

  const getIcon = () => {
    // Changed function name
    switch (actionType) {
      case 'modify': // Changed case value
        return <LuPenSquare />;
      case 'remove': // Changed case value
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className=' animate-spin' /> : getIcon()}
    </Button>
  );
};