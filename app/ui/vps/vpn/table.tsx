"use client";

import { VpnField } from "@/app/lib/definitions";
import Modal from "@/app/ui/vps/vpn/modal";
import { useState } from "react";
import ConfigBox from "./ConfigBox";

export default function Table(props: { vpn_clients: VpnField[] }) {
  const { vpn_clients } = props;
  const [selectedClient, setSelectedClient] = useState<VpnField | null>(null);
  const [config, setConfig] = useState("");
  const setSelectedClientFunc = async (client: VpnField) => {
    console.log("Current client::", client);
    const _config = `[Interface]
PrivateKey = ${client.private_key}
Address = ${client.ip_address}/32
DNS = 1.1.1.1

[Peer]
PublicKey = ${client.public_key}
Endpoint = 208.87.134.106:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`;
    setConfig(_config);
    setSelectedClient(client);
  };

  return (
    <div className="table mt-3 mt-md-5">
      <table
        className="table table-striped table-hover sortable"
        id="sortableTable"
      >
        <thead className="table-light">
          <tr>
            <th data-sort="string">
              No. <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>
            <th data-sort="number">
              Name <i className="bi bi-sort-numeric-down sort-icon"></i>
            </th>
            <th data-sort="string">
              IP <i className="bi bi-filter-circle sort-icon"></i>
            </th>
            <th data-sort="number">
              Date
              <i className="bi bi-currency-dollar sort-icon"></i>
            </th>
            <th scope="col" data-sort="date">
              Action <i className="bi bi-calendar sort-icon"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {vpn_clients.map((client, i) => (
            <tr key={client.id}>
              <td>{++i}</td>
              <td>{client.name}</td>
              <td>{client.ip_address}</td>
              <td>Date</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedClientFunc(client)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal client={selectedClient} onClose={() => setSelectedClient(null)}>
        <ConfigBox configText={config} />
      </Modal>
    </div>
  );
}
