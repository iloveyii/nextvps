export default function Utilization() {
  return (
    <div className="utilization my-3">
      <div className="row">
        <div className="col-md-3">
          <div className="card metric-card">
            <i className="bi bi-cpu text-primary"></i>
            <div className="value">78%</div>
            <div className="label">CPU Utilization</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card metric-card">
            <i className="bi bi-memory text-success"></i>
            <div className="value">64%</div>
            <div className="label">Memory Usage</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card metric-card">
            <i className="bi bi-hdd text-warning"></i>
            <div className="value">42%</div>
            <div className="label">Storage Usage</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card metric-card">
            <i className="bi bi-diagram-3 text-info"></i>
            <div className="value">24</div>
            <div className="label">Active VMs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
