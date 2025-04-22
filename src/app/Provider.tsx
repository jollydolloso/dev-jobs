'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactQueryClientProvider } from './utils/ReactClientQueryProvider';
import { ConfirmationProvider } from './components/confirmation/confirmation';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>
        <ConfirmationProvider>{children}</ConfirmationProvider>
        <Toaster/>
      </ReactQueryClientProvider>
    </SessionProvider>
  );
}
