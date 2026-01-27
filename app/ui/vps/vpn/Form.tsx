"use client";
import clsx from "clsx";
import { useState } from "react";
import { useActionState } from "react";
import { createVpn, State } from "@/app/lib/actions";
import Err from "@/app/ui/invoices/err";

export default function Form() {
  const [status, setStatus] = useState("completed");
  const className = clsx("spinner-border spinner-border-sm", {
    "d-none": status === "completed",
  });
  const classBtn = clsx("btn btn-primary px-1 px-md-3", {
    disabled: status === "progress",
  });
  const createVpnClient = () => {
    setStatus("progress");
    setTimeout(() => {
      setStatus("completed");
    }, 3000);
    return {
      message: null,
      errors: { vpn: ["Name cannot be empty"] },
    };
  };
  const initialState: State = {
    message: null,
    errors: { status: ["completed"] },
  };
  const [state, formAction] = useActionState(createVpn, initialState);
  console.log(state);
  return (
    <div className="mb-3" style={{ width: "auto" }}>
      <form className="input-group" action={formAction}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter client name..."
          aria-label="Input with suffix button"
        />

        <button type="submit" className={classBtn}>
          <span className={className} aria-hidden="true" /> Add WG
        </button>
      </form>
      {state?.errors?.vpn && <Err errors={state.errors.vpn} />}
    </div>
  );
}
