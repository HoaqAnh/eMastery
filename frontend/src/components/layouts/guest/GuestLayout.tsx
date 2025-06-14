import { type JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Magnet from "@/components/common/Magnet";
import NavActions from "./NavActions";
import "@styles/layouts/Layout.css";

const GuestLayout = (): JSX.Element => {
  const navigator = useNavigate();
  return (
    <div className="guest-layout">
      <header>
        <nav>
          <Magnet padding={50} disabled={false} magnetStrength={8}>
            <div className="nav-logo">
              <button className="logo" onClick={() => navigator("/welcome")}>
                <span className="actual-text">&nbsp;eMastery&nbsp;</span>
                <span aria-hidden="true" className="hover-text">
                  &nbsp;eMastery&nbsp;
                </span>
              </button>
            </div>
          </Magnet>
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
export default GuestLayout;
