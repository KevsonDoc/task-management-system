import { Button } from '@/components/Button';
import Input from '@/components/Input';
import Image from 'next/image';
import Link from 'next/link';

export function CreateView() {
  return (
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-xl bg-white px-5 py-5 text-gray-900 shadow-sm ring-inset">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="mark.svg"
            className="mx-auto h-20 w-auto"
            width={200}
            height={48}
            priority
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Input
              label="Name"
              id="name"
              name="name"
              type="text"
              required
              autoComplete="email"
            />
            <Input
              label="E-mail"
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
            <div>
              <Button title="Submit" />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Go to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
