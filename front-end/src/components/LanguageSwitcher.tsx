import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = (): JSX.Element => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
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
        </div>
    );
};

export default LanguageSwitcher;