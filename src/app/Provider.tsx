'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactQueryClientProvider } from './utils/ReactClientQueryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>
        {children}
      </ReactQueryClientProvider>
    </SessionProvider>
  );
}
