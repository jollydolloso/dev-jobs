// __mocks__/next-auth/react.ts
import React from 'react';

export const useSession = () => ({
  data: {
    user: {
      name: 'Test User',
      email: 'test@example.com',
    },
    expires: 'fake-expiration',
  },
  status: 'authenticated',
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const signIn = jest.fn();
export const signOut = jest.fn();
