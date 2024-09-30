"use client";

import { SessionProvider } from "next-auth/react";


interface Props {
  children: React.ReactNode;
}

export default function AuthProviders({ children, ...rest }: Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}