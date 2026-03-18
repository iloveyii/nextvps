import { UpdateWg, DeleteWg } from "@/app/ui/wg/buttons";
import { fetchFilteredWgClients } from "@/app/lib/data";
import Image from "next/image";
import WgStatus from "./status";

export default async function WgClientsTable({
  query,
  currentPage,
}: {
  readonly query: string;
  readonly currentPage: number;
}) {
  const clients = await fetchFilteredWgClients(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {clients?.map((client) => (
              <div
                key={client.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={client.image_url || "/default-avatar.png"}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${client.name}'s profile picture`}
                      />
                      <p className="font-medium">{client.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Device: {client.device_tag}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        client.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {client.status || "inactive"}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      IP: {client.ip_address || "Not assigned"}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateWg id={client.id} />
                    <DeleteWg id={client.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Device Tag
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  IP Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients?.map((client) => (
                <tr
                  key={client.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={client.image_url || "/default-avatar.png"}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${client.name}'s profile picture`}
                      />
                      <p className="font-medium">{client.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500">
                    {client.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm">
                    {client.device_tag}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-sm">
                    {client.ip_address || "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <WgStatus status={client.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateWg id={client.id} />
                      <DeleteWg id={client.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
