import Info from "@/app/ui/vps/info";
import Stats from "@/app/ui/vps/stats";
import Utilization from "@/app/ui/vps/utilization";
import RecentAlerts from "@/app/ui/vps/recent-alerts";
import QuickActions from "@/app/ui/vps/quick-actions";

export default function Page() {
  return (
    <div className="content row py-4">
      <div className="col-sm-3 g-0">
        <Info />
      </div>
      <div className="col-sm-9">
        <Stats />
        <Utilization />

        <div className="row">
          <div className="col-lg-8">
            <RecentAlerts />
          </div>
          <div className="col-lg-4">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
