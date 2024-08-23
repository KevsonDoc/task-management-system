import { ButtonHTMLAttributes } from 'react';
import Loading from '../Loading';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: IButtonProps) {
  return (
    <button
      type="submit"
      className="min-h-9 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      {...rest}
    >
      {isLoading ? <Loading /> : title}
    </button>
  );
}
