import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { resolveRole } from "@/lib/roles";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await resolveRole();

  return (
    <>
      <Header role={role} />
      <div className="flex flex-1">
        <main className="flex-1 p-4">{children}</main>
      </div>
    </>
  );
}