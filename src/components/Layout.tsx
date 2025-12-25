import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import "../styles/sidenav.css";

const Layout = () => {
  return (
    <div className="app-layout">
      <SideNav />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
