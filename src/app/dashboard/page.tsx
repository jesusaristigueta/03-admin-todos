import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function DasboardPage() {

  const session = await getServerSession(authOptions);

  if(!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1">

      <WidgetItem title="Usuario conectado Server Side">
        <div className="flex flex-col">
          <span className="font-bold">{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
        </div>

        <div>
          {JSON.stringify(session)}
        </div>
      </WidgetItem>

    </div>
  );
}