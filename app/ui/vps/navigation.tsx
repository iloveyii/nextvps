import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg top-navbar">
      <div className="container-fluid">
        <div className="row w-100">
          <div className="d-none d-sm-block col-md-3 d-flex alignn-items-center">
            <Link className="navbar-brand" href="#">
              Private Cloud Management
            </Link>
          </div>
          <div className="d-none d-sm-block col-md-6">
            <div className="news d-flex justify-content-center align-items-center">
              <div className="left">
                <Image
                  src="/images/svg/newsIcon.svg"
                  width={30}
                  height={30}
                  alt="news"
                />
              </div>
              <div className="right">
                <marquee>
                  <span>
                    Go annually or triennially and
                    <b>SAVE up to 55%</b> instantly, from your server's
                    <b>'Billing Information'</b> section!
                  </span>
                </marquee>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center col-md-3 align-items-center">
            <div className="icons w-100">
              <div className="notify">
                <img
                  src="/images/svg/notify.svg"
                  alt="Notification"
                  className="nav__notifyIcon"
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  9+
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>

              <div className="cart">
                <Link className="cart-btn" href="/manage/cart.php?a=view">
                  <img
                    src="/images/svg/cart.svg"
                    alt="Cart"
                    className="nav__cartIcon"
                  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    0<span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
              </div>

              <div className="user">
                <Image
                  src="/images/svg/profile.svg"
                  alt="User Profile"
                  className="nav__userProf"
                  height={30}
                  width={30}
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  5<span className="visually-hidden">unread messages</span>
                </span>
              </div>

              <div className="hamburger">
                <Image
                  src="/images/svg/hamburger.svg"
                  alt="x"
                  className="button"
                  id="btn-hamburger"
                  height={30}
                  width={30}
                />
                <Image
                  src="/images/svg/cross.svg"
                  alt="x"
                  className="button"
                  id="btn-close"
                  height={30}
                  width={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
