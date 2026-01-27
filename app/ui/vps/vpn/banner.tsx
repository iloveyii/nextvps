import Form from "@/app/ui/vps/vpn/Form";

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
          <Form />
        </div>
      </div>
    </div>
  );
}
