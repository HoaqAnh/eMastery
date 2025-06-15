import type { JSX } from "react";
import { useTheme } from "@context/ThemeContext";
import { useTranslation } from "react-i18next";
import { DarkIcon, LightIcon, SystemIcon } from "@components/common/Icons";

const ThemeSwitcher = (): JSX.Element => {
  const { themeSetting, setThemeSetting } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="nav-actions__theme-switcher">
      {/* Light theme */}
      <button
        className={`nav-actions__button nav-actions__theme-button${
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
        className={`nav-actions__button nav-actions__theme-button${
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
        className={`nav-actions__button nav-actions__theme-button${
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
  );
};

export default ThemeSwitcher;
