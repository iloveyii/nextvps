import { useState } from "react";

export default function ConfigBox({ configText }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(configText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>WireGuard Client Config</strong>
        <button
          onClick={copyToClipboard}
          className={`btn btn-sm ${copied ? "btn-success" : "btn-outline-primary"}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="card-body bg-light">
        <pre
          className="mb-0"
          style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}
        >
          {configText}
        </pre>
      </div>
    </div>
  );
}
