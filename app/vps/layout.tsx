import SideNav from "@/app/ui/vps/sidenav";
import Navigation from "@/app/ui/vps/navigation";
import Footer from "@/app/ui/vps/footer";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <SideNav />
      <div className="main-content">
        <Navigation />

        <div className="container-fluid content">{children}</div>
        <Footer />
      </div>
    </>
  );
}
