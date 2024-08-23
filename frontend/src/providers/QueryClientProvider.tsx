'use client';
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({ defaultOptions: {} });

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
}
