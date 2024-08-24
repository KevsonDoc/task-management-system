'use client';
import useCreateAccountHook from './create.hook';
import { CreateView } from './create.view';

export function CreateContainer() {
  return <CreateView {...useCreateAccountHook()} />;
}
