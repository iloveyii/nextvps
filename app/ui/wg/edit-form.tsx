"use client";

import { CustomerField, WgClient, WgClientForm } from "@/app/lib/definitions";
import {
  UserCircleIcon,
  KeyIcon,
  WifiIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { StateWg, updateWg } from "@/app/lib/actions/wg";
import { useActionState, useState } from "react";
import CustomerCombobox from "../customers/customer-combobox";
import Err from "../invoices/err";

export default function EditWgForm({
  wg,
  clients,
}: {
  readonly wg: WgClientForm;
  readonly clients: WgClient[];
}) {
  const initialState: StateWg = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateWg, initialState);
  const [selectedCustomer, setSelectedCustomer] = useState(wg.id);
  console.log(state);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label
            htmlFor="customer_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose customer
          </label>
          <div className="relative">
            <input type="hidden" id="id" name="id" value={wg.id} />
            <input
              type="hidden"
              id="customer_id"
              name="customer_id"
              value={selectedCustomer}
            />
            <CustomerCombobox
              customers={clients}
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              error={state.errors?.customer_id}
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer_id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customer_id && (
              <Err errors={state.errors.customer_id} />
            )}
          </div>
        </div>

        {/* Device Tag */}
        <div className="mb-4">
          <label
            htmlFor="device_tag"
            className="mb-2 block text-sm font-medium"
          >
            Device Tag
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="device_tag"
                name="device_tag"
                type="text"
                defaultValue={wg.device_tag}
                placeholder="Enter device tag (e.g., laptop, phone, server)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ServerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* IP Address */}
        <div className="mb-4">
          <label
            htmlFor="ip_address"
            className="mb-2 block text-sm font-medium"
          >
            IP Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="ip_address"
                name="ip_address"
                type="text"
                defaultValue={wg.ip_address || ""}
                placeholder="Enter IP address (e.g., 10.0.0.2)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <WifiIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Public Key */}
        <div className="mb-4">
          <label
            htmlFor="public_key"
            className="mb-2 block text-sm font-medium"
          >
            Public Key
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="public_key"
                name="public_key"
                type="text"
                defaultValue={wg.public_key || ""}
                placeholder="Enter WireGuard public key"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 font-mono"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Private Key (Optional - usually you don't edit this) */}
        <div className="mb-4">
          <label
            htmlFor="private_key"
            className="mb-2 block text-sm font-medium"
          >
            Private Key{" "}
            <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="private_key"
                name="private_key"
                type="password"
                defaultValue={wg.private_key || ""}
                placeholder="Enter private key (leave blank to keep existing)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 font-mono"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Client Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the client status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="enabled"
                  name="status"
                  type="radio"
                  value="enabled"
                  defaultChecked={wg.status === "enabled"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <label
                  htmlFor="enabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  Enabled <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="disabled"
                  name="status"
                  type="radio"
                  value="disabled"
                  defaultChecked={wg.status === "disabled" || !wg.status}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500"
                />
                <label
                  htmlFor="disabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Disabled <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/wg"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Client</Button>
      </div>
    </form>
  );
}
