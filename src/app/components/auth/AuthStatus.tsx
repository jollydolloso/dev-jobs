'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function AuthStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2 justify-between">
        <p className="text-sm">Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()} className="text-white">Sign Out</Button>
      </div>
    );
  }

  return (
    <Button  onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="text-white">
      Sign in with Google
    </Button>
  );
}
