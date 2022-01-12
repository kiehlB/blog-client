import clsx from 'clsx';
import * as React from 'react';

export default function TailInput({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      placeholder="Search..."
      className={clsx(
        className,
        'w-96 py-1.5 px-3 rounded-md dark:bg-dark mmd:w-5/6',
        'border border-gray-300 dark:border-gray-600',
        'dark:focus:border-primary-300 focus:border-primary-300 focus:ring-0 focus:outline-none',
      )}
      {...rest}
    />
  );
}
