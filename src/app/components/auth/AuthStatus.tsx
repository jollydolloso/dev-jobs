'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center justify-between">
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()} className="text-red-500">Sign Out</button>
      </div>
    );
  }

  return (
    <button  onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="text-blue-600">
      Sign in with Google
    </button>
  );
}
