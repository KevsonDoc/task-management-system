'use client';

import Api from '@/api';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function DashboardProvider({ children }: PropsWithChildren) {
  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      route.push('/');
      toast('Token expired', { type: 'error' });
    } else {
      Api.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }
  }, []);

  return <>{children}</>;
}
