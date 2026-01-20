"use client";

export default function Err(props: { readonly errors: string[] }) {
  const errors = props.errors;
  return (
    <>
      {errors.map((error: string) => (
        <p className="mt-2 text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </>
  );
}
