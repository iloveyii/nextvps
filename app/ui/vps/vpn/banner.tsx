export default function Banner() {
  return (
    <div className="banner">
      <div className="row">
        <div className="col-sm-6">
          <h2>Add VPN Client</h2>
          <p>
            Click the button on the right to add a new client. You can add as
            many clients as allowed in your subscription. <br />
            Then click the client in the table below to get details.
          </p>
        </div>
        <div className="col-sm-6 input-container">
          <div className="input-group mb-3" style={{ width: "auto" }}>
            <button className="btn btn-primary px-1 px-md-5" type="button">
              Add Wireguard Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
