"use client";

import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  UserCircleIcon,
  TagIcon,
  XMarkIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createWg, StateWg } from "@/app/lib/actions/wg";
import { useActionState, useState } from "react";
import Err from "@/app/ui/invoices/err";
import CustomerCombobox from "../customers/customer-combobox";

export default function Form({
  customers,
}: {
  readonly customers: CustomerField[];
}) {
  const initialState: StateWg = { message: null, errors: {} };
  const [state, formAction] = useActionState(createWg, initialState);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  console.log(state);

  // In your form
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer selec */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <input
              type="hidden"
              id="customer_id"
              name="customer_id"
              value={selectedCustomer}
            />
            <CustomerCombobox
              customers={customers}
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              error={state.errors?.customer_id}
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
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
                placeholder="Enter customer device tag"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="device_tag-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="device_tag-error" aria-live="polite" aria-atomic="true">
              {state.errors?.device_tag && (
                <Err errors={state.errors.device_tag} />
              )}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <div className="mb-4">
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="enabled"
                    name="status"
                    type="radio"
                    value="enabled"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    aria-describedby="status-error"
                  />
                  <label
                    htmlFor="enabled"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Disabled <XMarkIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="disabled"
                    name="status"
                    type="radio"
                    value="disabled"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="disabled"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Enabled <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state.errors?.status && <Err errors={state.errors.status} />}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Wg public_key */}
        <div className="mb-4">
          <label
            htmlFor="public_key"
            className="mb-2 block text-sm font-medium"
          >
            Public key
          </label>
          <div className="relative">
            <input
              id="public_key"
              name="public_key"
              type="text"
              placeholder="Public key"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="npublic_key-error"
            />
            <LockOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="public_key-error" aria-live="polite" aria-atomic="true">
            {state.errors?.public_key && (
              <Err errors={state.errors.public_key} />
            )}
          </div>
        </div>

        {/* Wg Private key */}
        <div className="mb-4">
          <label
            htmlFor="private_key"
            className="mb-2 block text-sm font-medium"
          >
            Private key
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="private_key"
                name="private_key"
                type="text"
                placeholder="Private key"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="private_key-error"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="private_key-error" aria-live="polite" aria-atomic="true">
              {state.errors?.private_key && (
                <Err errors={state.errors.private_key} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/wg"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Client</Button>
      </div>
    </form>
  );
}
