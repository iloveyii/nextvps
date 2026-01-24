import Link from "next/link";
import NavLinks from "@/app/ui/vps/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function SideNav() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <a className="nav-link" href="/">
            <img src="/images/svg/logo.svg?" alt="Logo" className="logo" />
          </a>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              <img src="/images/svg/home.svg" alt="Logo" className="logo" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/server.html">
              <img
                src="/images/svg/services.svg"
                alt="servers"
                className="nav-img"
              />
              Servers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/images/svg/apis.svg"
                alt="servers"
                className="nav-img"
              />
              APIs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/images/svg/domains.svg"
                alt="servers"
                className="nav-img"
              />
              Domains
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img src="/images/svg/ssls.svg" alt="ssls" className="nav-img" />{" "}
              SSLs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/images/svg/billing.svg"
                alt="ssls"
                className="nav-img"
              />
              Billing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <img
                src="/images/svg/support.svg"
                alt="ssls"
                className="nav-img"
              />
              Support
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              {" "}
              <i className="bi bi-hdd"></i> Storage{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-shield-check"></i> Security
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-graph-up"></i> Monitoring
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              {" "}
              <i className="bi bi-gear"></i> Settings{" "}
            </a>
          </li>
          <li className="nav-item mt-4">
            <a className="nav-link" href="#">
              <i className="bi bi-box-arrow-right"></i> Logout
            </a>
          </li>
        </ul>
      </div>

      <div className="mobile-menu">
        <div
          className="sidebar"
          style={{ width: "300px", display: "block", position: "relative" }}
        >
          <div className="sidebar-header">
            <a className="nav-link" href="/">
              <img src="/images/svg/logo.svg?" alt="Logo" className="logo" />
            </a>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <img src="/images/svg/home.svg" alt="Logo" className="logo" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src="/images/svg/services.svg"
                  alt="servers"
                  className="nav-img"
                />
                Servers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src="/images/svg/apis.svg"
                  alt="servers"
                  className="nav-img"
                />
                APIs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src="/images/svg/domains.svg"
                  alt="servers"
                  className="nav-img"
                />
                Domains
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src="/images/svg/ssls.svg"
                  alt="ssls"
                  className="nav-img"
                />{" "}
                SSLs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src="/images/svg/billing.svg"
                  alt="ssls"
                  className="nav-img"
                />
                Billing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <img
                  src="/images/svg/support.svg"
                  alt="ssls"
                  className="nav-img"
                />
                Support
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                <i className="bi bi-hdd"></i> Storage{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-shield-check"></i> Security
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-graph-up"></i> Monitoring
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-gear"></i> Settings
              </a>
            </li>
            <li className="nav-item mt-4">
              <a className="nav-link" href="#">
                <i className="bi bi-box-arrow-right"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
