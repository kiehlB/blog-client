import clsx from 'clsx';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

enum ButtonVariant {
  'default',
}

type ButtonProps = {
  isLoading?: boolean;
  bgColor?: string;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  className,
  disabled: buttonDisabled,
  isLoading,
  bgColor,
  variant = 'default',
  ...rest
}: ButtonProps) {
  const disabled = isLoading || buttonDisabled;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        `px-3 py-1 font-bold rounded-2xl bg-${bgColor}`,
        'border border-gray-300 shadow-sm dark:border-gray-600',
        'transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]',
        'transition duration-100',
        'animate-shadow',
        'text-white',
        'disabled:transform-none disabled:cursor-not-allowed',
        isLoading &&
          'relative !text-transparent hover:!text-transparent !cursor-wait transition-none',
        className,
      )}>
      {isLoading && (
        <div
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'text-black dark:text-white',
          )}>
          <ImSpinner2 className="animate-spin" />
        </div>
      )}
      {children}
    </button>
  );
}
