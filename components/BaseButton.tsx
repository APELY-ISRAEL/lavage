import { FC, ReactNode } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import Link from 'next/link';


interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  variantStyle?: 'primary' | 'danger' | 'outline';
  className?: string;
  children?: ReactNode;
  isLink?: boolean;
  href?: string;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const BaseButton: FC<BaseButtonProps> = ({
  variantStyle = 'primary',
  className,
  children,
  isLink = false,
  href,
  onClick,
  type,
  disabled,
  ...restProps
}) => {
  const style =
    variantStyle === 'primary'
      ? ' text-white hover:bg-primary-100 active:bg-primary-100/80'
      : variantStyle === 'danger'
        ? 'border border-primary-500 text-primary-100 bg-transparent hover:bg-primary-500 hover:text-white'
        : variantStyle === 'outline'
          ? 'border border-gray-200 bg-transparent hover:bg-gray-50 text-black'

          : '';

  if (isLink) {
    return (
      <Link
        href={href || '#'}
        className={cn(
          'flex w-full min-w-fit items-center justify-center gap-2 rounded-full px-4 py-2 text-center text-[clamp(14px,_2vw,_16px)] transition',
          style,
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Button
      className={cn(
        'w-full cursor-pointer rounded-full py-2 text-[clamp(16px,_2vw,_16px)]',
        style,
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default BaseButton;