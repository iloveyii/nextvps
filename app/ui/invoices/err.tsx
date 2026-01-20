import { State } from "@/app/lib/actions";

export default function Err(errors: string[]) {
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
