'use client';
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
}
