'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function DashboardProvider({ children }: PropsWithChildren) {
  const route = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('app')) {
      route.push('/');
      toast('Token expired', { type: 'error' });
    }
  }, []);

  return <>{children}</>;
}
