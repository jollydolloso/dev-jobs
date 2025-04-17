'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function ReactQueryClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());  // Create a QueryClient instance
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}