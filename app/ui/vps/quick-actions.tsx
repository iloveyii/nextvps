export default function QuickActions() {
  return (
    <div className="card">
      <div className="card-header">Quick Actions</div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-6">
            <div className="quick-action">
              <i className="bi bi-plus-circle"></i>
              <div>Deploy VM</div>
            </div>
          </div>
          <div className="col-6">
            <div className="quick-action">
              <i className="bi bi-cloud-upload"></i>
              <div>Upload Image</div>
            </div>
          </div>
          <div className="col-6">
            <div className="quick-action">
              <i className="bi bi-shield-check"></i>
              <div>Security Scan</div>
            </div>
          </div>
          <div className="col-6">
            <div className="quick-action">
              <i className="bi bi-graph-up"></i>
              <div>Generate Report</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
