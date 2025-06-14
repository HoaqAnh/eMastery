import { type JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Magnet from "@/components/common/Magnet";
import NavActions from "@components/layouts/Main/NavActions";
import NavMenu from "@components/layouts/Main/NavMenu";
import "@styles/layouts/Layout.css";

const MainLayout = (): JSX.Element => {
  const navigator = useNavigate();
  return (
    <div className="main-layout">
      <header>
        <nav>
          <Magnet padding={50} disabled={false} magnetStrength={8}>
            <div className="nav-logo">
              <button className="logo" onClick={() => navigator("/")}>
                <span className="actual-text">&nbsp;eMastery&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;eMastery&nbsp;
                </span>
              </button>
            </div>
          </Magnet>
          <div className="nav-menus">
            <NavMenu />
          </div>
          <div className="nav-actions">
            <NavActions />
          </div>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
