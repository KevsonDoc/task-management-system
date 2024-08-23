import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryClientProvider from '@/providers/QueryClientProvider';
import ToastProvider from '@/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Manager System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-200">
      <body
        className={`h-full ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <ToastProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
