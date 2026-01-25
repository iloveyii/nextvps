export default function Banner() {
  return (
    <div className="banner">
      <div className="row">
        <div className="col-sm-6">
          <h2>Register Domain</h2>
          <p>
            Find your new domain name. Enter your name or keywords below to
            check availability.
          </p>
        </div>
        <div className="col-sm-6 input-container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter something…"
              aria-label="Input with suffix button"
            />
            <button className="btn btn-primary px-1 px-md-5" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
