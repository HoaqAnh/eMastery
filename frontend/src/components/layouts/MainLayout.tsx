import { type JSX, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, Toaster } from "react-hot-toast";
import ThemeSwitcher from "./ThemeSwitcher";
import Magnet from "@/components/common/Magnet";
import UserSettings from "./UserSettings";
import DesktopFeatures from "./DesktopFeatures";
import MobileMenu from "./MobileMenu";
import ProfilePopup from "@/components/common/ProfilePopup";
import ConfirmationPopup from "@/components/common/ConfirmationPopup";

import "@styles/layouts/Layout.css";
import "@styles/components/NavActions.css";
import "@styles/components/NavMenu.css";

const MainLayout = (): JSX.Element => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.clear();
    setIsLogoutPopupOpen(false);
    navigator("/welcome", { replace: true });
    window.location.reload();
  };

  return (
    <div className="main-layout">
      <Toaster position="top-center" reverseOrder={false} />

      <ProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={() => setIsProfilePopupOpen(false)}
      />

      <ConfirmationPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        onConfirm={handleLogoutConfirm}
        title={t("logout.title")}
        message={t("logout.message")}
        confirmText={t("logout.confirmButton")}
        cancelText={t("logout.cancelButton")}
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
            <DesktopFeatures />
          </div>
          <div className="nav-actions">
            <MobileMenu />
            <ThemeSwitcher />
            <UserSettings
              onOpenProfilePopup={() => setIsProfilePopupOpen(true)}
              onOpenLogoutPopup={() => setIsLogoutPopupOpen(true)}
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
