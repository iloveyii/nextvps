export default function Info() {
  return (
    <div className="actions-container">
      <div className="actions">
        <ul className="list-group actions">
          <li className="list-group-item active">
            <i className="bi bi-person text-primary"></i>
            Your Info
          </li>

          <li className="border-0 list-group-item">
            <div
              className="list-group list-group-flush collapse show"
              id="item1"
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item border-0">
                  <div className="label">Company Name</div>
                  <div className="value">SoftHem Sweden</div>
                </li>
                <li className="list-group-item border-0">
                  <div className="label">Name</div>
                  <div className="value">Hazrat Ali</div>
                </li>
                <li className="list-group-item border-0">
                  <div className="label">Address</div>
                  <div className="value">Doktor Lib</div>
                </li>
                <li className="list-group-item border-0">
                  <div className="label">Landmark</div>
                  <div className="value">Gothenburg</div>
                </li>
                <li className="list-group-item">
                  <div className="label">Pincode/Zipcode</div>
                  <div className="value">12 345</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <button className="btn btn-primary w-100 mt-3">
          <i className="bi bi-pencil-square"></i>
          Edit Profile
        </button>

        <ul className="list-group actions my-3">
          <li className="list-group-item active">
            <i className="bi bi-person text-primary"></i>
            Available Credits
          </li>

          <li className="border-0 list-group-item">
            <div
              className="list-group list-group-flush collapse show"
              id="item1"
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item border-0 d-flex align-items-center justify-content-between">
                  <div className="label border-0">Amount</div>
                  <div className="value">$0.0</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div className="buttons">
        <button className="btn btn-primary w-100 mt-3">
          <i className="bi bi-plus"></i>
          Add Funds
        </button>

        <button className="btn btn-primary w-100 mt-3">
          <i className="bi bi-box-arrow-up-right"></i>
          Purchase a New Server
        </button>
      </div>
    </div>
  );
}
