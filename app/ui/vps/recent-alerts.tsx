export default function RecentAlerts() {
  return (
    <div className="card">
      <div className="card-header">Recent Alerts</div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          <div className="list-group-item d-flex justify-content-between align-items-start px-0">
            <div className="alerts">
              <div className="fw-bold">High CPU Usage</div>
              <small className="text-muted">
                Web-Server-01 - 5 minutes ago
              </small>
            </div>
            <span className="badge bg-warning rounded-pill">Warning</span>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-start px-0">
            <div className="alerts">
              <div className="fw-bold">VM Deployed</div>
              <small className="text-muted">Test-VM-02 - 1 hour ago</small>
            </div>
            <span className="badge bg-success rounded-pill">Info</span>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-start px-0">
            <div className="alerts">
              <div className="fw-bold">Storage Threshold</div>
              <small className="text-muted">
                Primary Storage - 2 hours ago
              </small>
            </div>
            <span className="badge bg-danger rounded-pill">Critical</span>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-start px-0">
            <div className="alerts">
              <div className="fw-bold">Backup Completed</div>
              <small className="text-muted">Daily Backup - 3 hours ago</small>
            </div>
            <span className="badge bg-success rounded-pill">Success</span>
          </div>
        </div>
      </div>
    </div>
  );
}
