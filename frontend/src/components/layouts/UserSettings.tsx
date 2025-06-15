import type { JSX } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useTheme } from "@context/ThemeContext";
import { useTranslation } from "react-i18next";
import { DarkIcon, LightIcon, UserIcon } from "@components/common/Icons";

type ThemeSetting = "light" | "dark" | "system";

const UserSettings = (): JSX.Element => {
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
  );
};

export default UserSettings;
