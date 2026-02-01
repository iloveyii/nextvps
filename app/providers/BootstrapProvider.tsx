// app/components/BootstrapProvider.tsx
"use client";

import { useEffect } from "react";

export default function BootstrapProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
        .then(() => {
          console.log("Bootstrap JS loaded successfully");
        })
        .catch((error) => {
          console.error("Error loading Bootstrap JS:", error);
        });
    }
  }, []);

  return <>{children}</>;
}
