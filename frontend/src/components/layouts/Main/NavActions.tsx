import { type JSX } from "react";
import { useTheme } from "@context/ThemeContext";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";
import "@styles/components/NavActions.css";
import {
  DarkIcon,
  LightIcon,
  SystemIcon,
  UserIcon,
} from "@components/common/Icons";

type ThemeSetting = "light" | "dark" | "system";

const NavActions = (): JSX.Element => {
  const { themeSetting, setThemeSetting } = useTheme();
  const { t, i18n } = useTranslation();

  const {
    ref: dropdownRef,
    isOpen: isDropdownOpen,
    // setIsOpen: setIsDropdownOpen,
    toggleDropdown,
  } = useClickOutside<HTMLDivElement>();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleThemeChange = (theme: ThemeSetting) => {
    setThemeSetting(theme);
  };

  return (
    <div className="nav-actions">
      {/* Theme Switcher */}
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

      {/* Language Switcher */}
      <div className="nav-actions__language-switcher">
        <button
          className={`nav-actions__button nav-actions__language-button${
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
          className={`nav-actions__button nav-actions__language-button${
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

      {/* User Settings*/}
      <div className="nav-actions__user-settings" ref={dropdownRef}>
        <button
          className="nav-actions__user-button"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          title="User Settings"
          type="button"
        >
          {UserIcon}
        </button>

        {/* Dropdown Menu */}
        <div
          className={`nav-actions__dropdown ${
            isDropdownOpen ? "nav-actions__dropdown--open" : ""
          }`}
        >
          <div className="nav-actions__dropdown-content">
            {/* Profile setting Section */}
            <div className="nav-actions__dropdown-section">
              <h3 className="nav-actions__dropdown-title">
                {t("userProfile.title", "Profile")}
              </h3>
              <div className="nav-actions__dropdown-profile-group">
                <button
                  className="nav-actions__dropdown-item nav-actions__dropdown-profile-item"
                  type="button"
                >
                  {UserIcon}
                  <span>{t("userProfile.viewProfile", "Profile")}</span>
                </button>
              </div>
            </div>

            {/* Theme Settings Section */}
            <div className="nav-actions__dropdown-section">
              <h3 className="nav-actions__dropdown-title">
                {t("settings.themeSettings.title", "Theme")}
              </h3>
              <div className="nav-actions__dropdown-theme-group">
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-theme-item${
                    themeSetting === "light" ? " active" : ""
                  }`}
                  onClick={() => handleThemeChange("light")}
                  type="button"
                >
                  {LightIcon}
                  <span>{t("settings.themeSettings.light", "Light")}</span>
                </button>
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-theme-item${
                    themeSetting === "dark" ? " active" : ""
                  }`}
                  onClick={() => handleThemeChange("dark")}
                  type="button"
                >
                  {DarkIcon}
                  <span>{t("settings.themeSettings.dark", "Dark")}</span>
                </button>
              </div>
            </div>

            {/* Language Settings Section */}
            <div className="nav-actions__dropdown-section">
              <h3 className="nav-actions__dropdown-title">
                {t("settings.languageSettings.title", "Language")}
              </h3>
              <div className="nav-actions__dropdown-language-group">
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-language-item${
                    i18n.language === "en" ? " active" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                  disabled={i18n.language === "en"}
                  type="button"
                >
                  <span>{t("settings.languageSettings.en", "Language")}</span>
                </button>
                <button
                  className={`nav-actions__dropdown-item nav-actions__dropdown-language-item${
                    i18n.language === "vi" ? " active" : ""
                  }`}
                  onClick={() => changeLanguage("vi")}
                  disabled={i18n.language === "vi"}
                  type="button"
                >
                  <span>{t("settings.languageSettings.vi", "Language")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavActions;
