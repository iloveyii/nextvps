// app/components/LayoutWrapper.tsx
"use client";

import useBootstrap from "@/app/hooks/useBootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LayoutWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const isBootstrapLoaded = useBootstrap();

  // Optionally show loading state
  if (!isBootstrapLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
