import Form from "@/app/ui/wg/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchWgById, fetchWgClients } from "@/app/lib/actions/wg";
import { notFound } from "next/navigation";

export default async function Page(props: {
  readonly params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const [wg, clients] = await Promise.all([fetchWgById(id), fetchWgClients()]);
  if (!wg) {
    return notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Clients", href: "/dashboard/wg" },
          {
            label: "Edit Client",
            href: `/dashboard/wg/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form wg={wg} clients={clients} />
    </main>
  );
}
