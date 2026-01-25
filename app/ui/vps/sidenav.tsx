import Link from "next/link";
import NavLinks from "@/app/ui/vps/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

export default function SideNav() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <Link className="nav-link" href="/vps">
            <Image
              src="/images/svg/logo.svg?"
              alt="Logo"
              width={120}
              height={40}
              className="logo"
            />
          </Link>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" href="/vps">
              <Image
                src="/images/svg/home.svg"
                alt="Logo"
                width={30}
                height={30}
                className="logo"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/vps/servers">
              <Image
                src="/images/svg/services.svg"
                alt="servers"
                width={30}
                height={30}
                className="nav-img"
              />
              Servers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/vps/vpn">
              <i className="bi bi-shield-check"></i> VPN
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <Image
                src="/images/svg/apis.svg"
                alt="servers"
                width={30}
                height={30}
                className="nav-img"
              />
              APIs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <Image
                src="/images/svg/domains.svg"
                alt="servers"
                width={30}
                height={30}
                className="nav-img"
              />
              Domains
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <Image
                src="/images/svg/ssls.svg"
                alt="ssls"
                width={30}
                height={30}
                className="nav-img"
              />{" "}
              SSLs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <Image
                src="/images/svg/billing.svg"
                alt="ssls"
                width={30}
                height={30}
                className="nav-img"
              />
              Billing
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <Image
                src="/images/svg/support.svg"
                alt="ssls"
                width={30}
                height={30}
                className="nav-img"
              />
              Support
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <i className="bi bi-hdd"></i> Storage{" "}
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="#">
              <i className="bi bi-graph-up"></i> Monitoring
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              <i className="bi bi-gear"></i> Settings{" "}
            </Link>
          </li>
          <li className="nav-item mt-4">
            <Link className="nav-link" href="#">
              <i className="bi bi-box-arrow-right"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className="mobile-menu">
        <div
          className="sidebar"
          style={{ width: "300px", display: "block", position: "relative" }}
        >
          <div className="sidebar-header">
            <Link className="nav-link" href="/">
              <Image
                src="/images/svg/logo.svg?"
                alt="Logo"
                width={30}
                height={30}
                className="logo"
              />
            </Link>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" href="#">
                <Image
                  src="/images/svg/home.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="logo"
                />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <Image
                  src="/images/svg/services.svg"
                  alt="servers"
                  width={30}
                  height={30}
                  className="nav-img"
                />
                Servers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <Image
                  src="/images/svg/apis.svg"
                  alt="servers"
                  width={30}
                  height={30}
                  className="nav-img"
                />
                APIs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <Image
                  src="/images/svg/domains.svg"
                  alt="servers"
                  width={30}
                  height={30}
                  className="nav-img"
                />
                Domains
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <Image
                  src="/images/svg/ssls.svg"
                  alt="ssls"
                  width={30}
                  height={30}
                  className="nav-img"
                />
                SSLs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <Image
                  src="/images/svg/billing.svg"
                  alt="ssls"
                  width={30}
                  height={30}
                  className="nav-img"
                />
                Billing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <Image
                  src="/images/svg/support.svg"
                  alt="ssls"
                  width={30}
                  height={30}
                  className="nav-img"
                />
                Support
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <i className="bi bi-hdd"></i> Storage{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <i className="bi bi-shield-check"></i> Security
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <i className="bi bi-graph-up"></i> Monitoring
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <i className="bi bi-gear"></i> Settings
              </Link>
            </li>
            <li className="nav-item mt-4">
              <Link className="nav-link" href="#">
                <i className="bi bi-box-arrow-right"></i> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
