// app/components/UserModal.tsx
"use client";

import React, { useEffect, useRef } from "react";

export default function Modal({
  client,
  onClose,
  children,
}: {
  readonly client: any;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}) {
  const modalRef = useRef(null);
  const modalInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && modalRef.current) {
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      modalInstance.current = new bootstrap.Modal(modalRef.current, {
        backdrop: true,
      });
    }
  }, []);

  useEffect(() => {
    if (client && modalInstance.current) {
      modalInstance.current?.show();
    }
  }, [client]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <h5 className="modal-title">VPN Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => modalInstance.current.hide()}
            />
          </div>
          <div className="modal-body">
            {client && (
              <p>
                <strong>Name:</strong> {client.name}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
