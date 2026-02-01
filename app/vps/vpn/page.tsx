import Info from "@/app/ui/vps/info";
import Stats from "@/app/ui/vps/stats";
import Utilization from "@/app/ui/vps/utilization";
import RecentAlerts from "@/app/ui/vps/recent-alerts";
import QuickActions from "@/app/ui/vps/quick-actions";
import Banner from "@/app/ui/vps/vpn/banner";
import Table from "@/app/ui/vps/vpn/table";
import { fetchVpnClients } from "@/app/lib/data";

export default async function Page() {
  const vpn_clients = await fetchVpnClients();

  return (
    <div className="content row py-4">
      <div className="col-sm-3 g-0">
        <Info />
      </div>
      <div className="col-sm-9">
        <div className="right-container">
          <div className="row">
            <div className="col-sm-12">
              <div className="register">
                <Banner />
                <Table vpn_clients={vpn_clients} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
