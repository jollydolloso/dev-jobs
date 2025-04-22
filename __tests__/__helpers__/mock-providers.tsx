'use client';

import React from 'react';
import { TestQueryProvider } from './test-utils';

const MockSessionProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const MockConfirmationProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const MockToaster = () => null;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MockSessionProvider>
      <TestQueryProvider>
        <MockConfirmationProvider>{children}</MockConfirmationProvider>
        <MockToaster />
      </TestQueryProvider>
    </MockSessionProvider>
  );
}