import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import "@styles/layouts/GuestLayout.css";
import NavActions from "./NavActions";

const GuestLayout = (): JSX.Element => (
  <div className="guest-layout">
    <header>
      <nav>
        <div className="nav-logo">
          <button className="logo" data-text="Awesome">
            <span className="actual-text">&nbsp;eMastery&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;eMastery&nbsp;
            </span>
          </button>
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

export default GuestLayout;
