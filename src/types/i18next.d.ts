import 'i18next';

import enTranslation from '../../public/locales/en/translation.json';
// import viTranslation from '../../public/locales/vi/translation.json'; // Không cần thiết cấu trúc giống hệt enTranslation

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: typeof enTranslation;
        };
    }
}