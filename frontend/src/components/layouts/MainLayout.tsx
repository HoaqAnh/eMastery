import { type JSX, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ThemeSwitcher from "./ThemeSwitcher";
import Magnet from "@/components/common/Magnet";
import UserSettings from "./UserSettings";
import LanguageSwitcher from "./LanguageSwitcher";
import DesktopFeatures from "./DesktopFeatures";
import MobileMenu from "./MobileMenu";
import ProfilePopup from "@/components/common/ProfilePopup";

import "@styles/layouts/Layout.css";
import "@styles/components/NavActions.css";
import "@styles/components/NavMenu.css";

const MainLayout = (): JSX.Element => {
  const navigator = useNavigate();
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  return (
    <div className="main-layout">
      <Toaster position="top-center" reverseOrder={false} />

      <ProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={() => setIsProfilePopupOpen(false)}
      />

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
          <div className="nav-menu">
            <MobileMenu />
            <DesktopFeatures />
          </div>
          <div className="nav-actions">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <UserSettings
              onOpenProfilePopup={() => setIsProfilePopupOpen(true)}
            />
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