import { type JSX } from "react";
import { useTranslation } from 'react-i18next';

const UserHome = (): JSX.Element => {
    const { t } = useTranslation();
    const userInfo = {
        name: 'John Doe',
        email: 'abc@engpractive.com'
    }

    return (
        <div className="home">
            <h1>{t('home.title')}</h1>
            <p>{t('greeting.helloUser', { name: userInfo.name })}</p>
            <p>{t('home.welcome')}</p>
            <p>{t('home.explore')}</p>
        </div>
    );
}

export default UserHome;