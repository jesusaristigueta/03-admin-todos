"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {

  const { data: session } = useSession();

  return (
    <div>
      <h1>Profile Page</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name ?? 'Usuario'}</span>
        <span>{session?.user?.email ?? 'email@domain.com'}</span>
        <span>{session?.user?.image ?? 'Sin imagen'}</span>
        <span>{session?.user?.id ?? 'No UUID'}</span>
        <span className="capitalize">{session?.user?.roles?.join(',') ?? ['no-roles']}</span>
      </div>
    </div>
  );
}