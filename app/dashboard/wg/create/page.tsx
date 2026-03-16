import Form from "@/app/ui/wg/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Wg", href: "/dashboard/wg" },
          {
            label: "Create Wireguard Client",
            href: "/dashboard/wg/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
