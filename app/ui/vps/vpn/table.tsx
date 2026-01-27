import { fetchVpnClients } from "@/app/lib/data";
import { tr } from "zod/v4/locales";

export default async function Table() {
  const vpn_clients = await fetchVpnClients();

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
          {vpn_clients.map((client) => (
            <tr key={client.id}>
              <td>{client.serial_number}</td>
              <td>Name</td>
              <td>{client.ip_address}</td>
              <td>Date</td>
              <td>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
