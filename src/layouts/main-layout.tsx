import { type JSX } from "react";
import { useTranslation } from 'react-i18next';
import { Outlet } from "react-router-dom";
import logo from "../assets/react.svg"
import ThemeSwitcher from "../components/ThemeSwitcher";
import "../styles/layouts/main-layout.css";

const MainLayout = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className="main-layout">
            <header>
                <div className="nav-background" />
                <nav>
                    <div className="logo">
                        <a href="/">
                            <img src={logo} alt="Logo" />
                        </a>
                        <h1>EngPractice</h1>
                    </div>
                    <div className="menu">
                        ACTION
                    </div>
                    <div className="nav-actions">
                        <button
                            onClick={() => changeLanguage('en')}
                            disabled={i18n.language === 'en'}
                            style={{ fontWeight: i18n.language === 'en' ? 'bold' : 'normal', marginRight: '5px' }}
                        >
                            English
                        </button>
                        <button
                            onClick={() => changeLanguage('vi')}
                            disabled={i18n.language === 'vi'}
                            style={{ fontWeight: i18n.language === 'vi' ? 'bold' : 'normal' }}
                        >
                            Tiếng Việt
                        </button>
                        <ThemeSwitcher />
                        <button>
                            {t('settings.notifications')}
                        </button>
                    </div>
                </nav>
            </header>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
export default MainLayout;