'use client';
import useLoginHook from './login.hook';
import { LoginView } from './login.view';

export function LoginContainer() {
  return <LoginView {...useLoginHook()} />;
}
