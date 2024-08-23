'use client';
import { Button } from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import { ILoginContainerDI } from './login.contract';
import Input from '@/components/Input';

export function LoginView(props: ILoginContainerDI) {
  return (
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm gap-x-1.5 rounded-xl bg-white px-5 py-5 text-gray-900 ring-1 ring-inset ring-gray-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="mark.svg"
            className="mx-auto h-20 w-auto"
            width={200}
            height={48}
            priority
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={props.form.handleSubmit(props.form.onSubmit)}
            className="space-y-6"
          >
            <Input
              label="E-mail"
              id="email"
              error={props.form.errors.email?.message}
              {...props.form.register('email', {
                setValueAs: (value) => value || undefined,
              })}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              error={props.form.errors.password?.message}
              {...props.form.register('password', {
                setValueAs: (value) => value || undefined,
              })}
            />
            <div>
              <Button
                title="Sign in"
                type="submit"
                isLoading={props.form.isLoading}
              />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              href="/create"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
