import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="container-fluid footer-container">
      <div className="row">
        <div className="col">
          <footer className="footer">
            <div className="row">
              <div className="col-md-2">
                <div className="my-3">
                  <Link href="/">Contact us</Link>
                </div>
              </div>
              <div className="col-md-2">
                <Link href="/">Terms of Service</Link>
              </div>
              <div className="col-md-5">
                <small className="muted">
                  Copyright © 2025 PCM Cloud. All Rights Reserved.
                </small>
              </div>
              <div className="col-md-3">
                <div className="social">
                  <Image
                    width={30}
                    height={30}
                    src="/images/svg/facebook.svg"
                    alt="facebook"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/images/svg/instagram.svg"
                    alt="instagram"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/images/svg/linkedin.svg"
                    alt="linkedin"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/images/svg/twitter.svg"
                    alt="twitter"
                  />
                  <Image
                    width={30}
                    height={30}
                    src="/images/svg/youtube.svg"
                    alt="youtube"
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
