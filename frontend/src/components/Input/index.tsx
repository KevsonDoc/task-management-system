'use client';
import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function InputBase(
  { label, error, ...props }: IInputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          ref={ref}
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {error && (
        <span className="text-white-900 text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}

const Input = forwardRef(InputBase);
export default Input;
