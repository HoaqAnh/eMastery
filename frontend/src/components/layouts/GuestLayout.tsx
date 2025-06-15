import { type JSX } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Magnet from "@/components/common/Magnet";
import { GoogleIcon } from "@components/common/Icons";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

import "@styles/layouts/Layout.css";
import "@styles/components/NavActions.css";

const GuestLayout = (): JSX.Element => {
  const navigator = useNavigate();
  const { t } = useTranslation();

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
          <div className="nav_guest-actions">
            {/* User subscribe */}
            <div className="nav_guest-actions__subscribe">
              <button
                className={`nav_guest-actions__subscribe-button`}
                title={t("subscribe.title")}
                type="button"
                onClick={() => navigator("/subscribe")}
              >
                {GoogleIcon}
                <span>{t("subscribe.title")}</span>
              </button>
            </div>
            <div className="nav-actions">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
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
