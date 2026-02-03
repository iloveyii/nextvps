"use client";
import clsx from "clsx";
import { useState } from "react";
import { useActionState } from "react";
import { createVpn, State } from "@/app/lib/actions";
import Err from "@/app/ui/invoices/err";

export default function Form() {
  const [status, setStatus] = useState("completed");

  const createVpnLocal = async (state: State, formData: FormData) => {
    setStatus("progress");
    setTimeout(() => {
      setStatus("completed");
      console.log(`Delay ${3000} completed!`);
    }, 3000);
    return createVpn(state, formData);
  };

  const initialState: State = {
    message: null,
    errors: { status: ["completed"] },
  };
  const [state, formAction] = useActionState(createVpnLocal, initialState);
  console.log(state);
  return (
    <div className="mb-3" style={{ width: "auto" }}>
      <form className="input-group" action={formAction}>
        <input
          name="name"
          type="text"
          className="form-control"
          placeholder="Enter client name..."
          aria-label="Input with suffix button"
        />

        <button
          type="submit"
          className={clsx("btn btn-primary px-1 px-md-3", {
            disabled: status === "progress",
          })}
        >
          <span
            className={clsx("spinner-border spinner-border-sm", {
              "d-none": status === "completed",
            })}
            aria-hidden="true"
          />{" "}
          Add VPN
        </button>
      </form>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.name && <Err errors={state.errors.name} />}
      </div>
    </div>
  );
}
