import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher: React.FC = () => {
  const { themeSetting, setThemeSetting } = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="theme-select">{t('settings.theme')}: </label>
      <select
        id="theme-select"
        value={themeSetting}
        onChange={(e) => setThemeSetting(e.target.value as 'light' | 'dark' | 'system')}
      >
        <option value="light">{t('settings.themeSettings.light')}</option>
        <option value="dark">{t('settings.themeSettings.dark')}</option>
        <option value="system">{t('settings.themeSettings.system')}</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;