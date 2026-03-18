"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { CustomerField, WgClient } from "@/app/lib/definitions";

export default function CustomerCombobox({
  customers,
  onChange,
  value,
  error,
}: {
  readonly customers: CustomerField[];
  readonly onChange: (value: string) => void;
  readonly value: string;
  readonly error?: string[];
}) {
  const [query, setQuery] = useState("");

  const filteredCustomers =
    query === ""
      ? customers
      : customers.filter((customer) => {
          return (
            customer.name.toLowerCase().includes(query.toLowerCase()) ||
            customer.email?.toLowerCase().includes(query.toLowerCase())
          );
        });

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative">
        <div className="relative">
          <Combobox.Input
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-10 text-sm outline-2 placeholder:text-gray-500"
            displayValue={(customerId) => {
              const customer = customers.find((c) => c.id === customerId);
              return customer ? customer.name : "";
            }}
            placeholder="Search for a customer..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {filteredCustomers.length === 0 && query !== "" ? (
            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
              No customers found.
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <Combobox.Option
                key={customer.id}
                value={customer.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                    >
                      {customer.name}
                      {customer.email && (
                        <span
                          className={`ml-2 text-sm ${active ? "text-blue-200" : "text-gray-500"}`}
                        >
                          ({customer.email})
                        </span>
                      )}
                    </span>
                    {selected && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-blue-600"
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
