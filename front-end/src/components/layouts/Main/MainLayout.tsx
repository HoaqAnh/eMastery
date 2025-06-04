import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import "@styles/layouts/MainLayout.css";
import NavActions from "@components/common/NavActions";
import NavMenu from "@/components/common/NavMenu";

const MainLayout = (): JSX.Element => (
  <div className="main-layout">
    <header>
      <div className="nav-background" />
      <nav>
        <div className="nav-logo">
          <button className="logo" data-text="Awesome">
            <span className="actual-text">&nbsp;eMastery&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;eMastery&nbsp;
            </span>
          </button>
        </div>
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

export default MainLayout;
