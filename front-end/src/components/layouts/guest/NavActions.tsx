import { type JSX } from "react";
import { useTheme } from "@context/ThemeContext";
import { useTranslation } from "react-i18next";
import "@styles/components/NavGuestActions.css";
import {
  DarkIcon,
  GoogleIcon,
  LightIcon,
  SystemIcon,
} from "@components/common/Icons";

const NavActions = (): JSX.Element => {
  const { themeSetting, setThemeSetting } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="nav_guest-actions">
      {/* User subscribe */}
      <div className="nav_guest-actions__subscribe">
        <button
          className={`nav_guest-actions__subscribe-button`}
          title={t("greeting.subscribe")}
          type="button"
        >
          {GoogleIcon}
          <span>{t("greeting.subscribe")}</span>
        </button>
      </div>

      {/* Theme Switcher */}
      <div className="nav_guest-actions__theme-switcher">
        {/* Light theme */}
        <button
          className={`nav_guest-actions__button nav_guest-actions__theme-button${
            themeSetting === "light" ? " active" : ""
          }`}
          aria-pressed={themeSetting === "light"}
          onClick={() => setThemeSetting("light")}
          title={t("settings.themeSettings.light")}
          type="button"
        >
          {LightIcon}
        </button>

        {/* System theme */}
        <button
          className={`nav_guest-actions__button nav_guest-actions__theme-button${
            themeSetting === "system" ? " active" : ""
          }`}
          aria-pressed={themeSetting === "system"}
          onClick={() => setThemeSetting("system")}
          title={t("settings.themeSettings.system")}
          type="button"
        >
          {SystemIcon}
        </button>

        {/* Dark theme */}
        <button
          className={`nav_guest-actions__button nav_guest-actions__theme-button${
            themeSetting === "dark" ? " active" : ""
          }`}
          aria-pressed={themeSetting === "dark"}
          onClick={() => setThemeSetting("dark")}
          title={t("settings.themeSettings.dark")}
          type="button"
        >
          {DarkIcon}
        </button>
      </div>

      {/* Language Switcher */}
      <div className="nav_guest-actions__language-switcher">
        <button
          className={`nav_guest-actions__button nav_guest-actions__language-button${
            i18n.language === "en" ? " active" : ""
          }`}
          onClick={() => changeLanguage("en")}
          disabled={i18n.language === "en"}
          title="Switch to English"
          type="button"
        >
          {t("settings.languageSettings.en", "Language")}
        </button>
        <button
          className={`nav_guest-actions__button nav_guest-actions__language-button${
            i18n.language === "vi" ? " active" : ""
          }`}
          onClick={() => changeLanguage("vi")}
          disabled={i18n.language === "vi"}
          title="Chuyển sang Tiếng Việt"
          type="button"
        >
          {t("settings.languageSettings.vi", "Language")}
        </button>
      </div>
    </div>
  );
};

export default NavActions;
