import Image from "next/image";

export default function Stats() {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="stats server">
          <div className="heading">1</div>
          <div className="subheading">Servers</div>
          <span className="img">
            <Image
              src="/images/svg/server.svg"
              alt="server"
              width={30}
              height={30}
            />
          </span>
          <span className="bg"></span>
        </div>
      </div>

      <div className="col-md-3">
        <div className="stats server">
          <div className="heading">0</div>
          <div className="subheading">Domains</div>
          <span className="img">
            <Image
              src="/images/svg/domain.svg"
              alt="domain"
              height={30}
              width={30}
            />
          </span>
          <span className="bg"></span>
        </div>
      </div>

      <div className="col-md-3">
        <div className="stats server">
          <div className="heading">2</div>
          <div className="subheading">Tickets</div>
          <span className="img">
            <Image
              src="/images/svg/tickets.svg"
              alt="ticket"
              height={30}
              width={30}
            />
          </span>
          <span className="bg"></span>
        </div>
      </div>

      <div className="col-md-3">
        <div className="stats server">
          <div className="heading">1</div>
          <div className="subheading">Invoices</div>
          <span className="img">
            <Image
              src="/images/svg/invoices.svg"
              alt="invoices"
              height={30}
              width={30}
            />
          </span>
          <span className="bg"></span>
        </div>
      </div>
    </div>
  );
}
