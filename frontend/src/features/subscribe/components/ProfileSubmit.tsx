import type { JSX } from "react";
import { useTranslation } from "react-i18next";

const ProfileSubmit = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <div className="card__header">
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.profile.content")}</p>
      </div>
      <div className="card__form">
        {/* Age */}
        <input
          id="age"
          type="number"
          className="card__form input"
          placeholder={t("subscribe.profile.age")}
        />

        {/* Gender */}
        <select
          id="gender"
          className="card__form-select"
          aria-label={t("subscribe.profile.sex.title")}
          defaultValue=""
        >
          <option value="" disabled>
            {t("subscribe.profile.sex.title")}
          </option>
          <option value="male">{t("subscribe.profile.sex.male")}</option>
          <option value="female">{t("subscribe.profile.sex.female")}</option>
          <option value="other">{t("subscribe.profile.sex.unsex")}</option>
        </select>

        {/* Level */}
        <select
          id="level"
          className="card__form-select"
          aria-label={t("subscribe.profile.level.title")}
          defaultValue=""
        >
          <option value="" disabled>
            {t("subscribe.profile.level.title")}
          </option>
          <option value="A1">{t("subscribe.profile.level.A1")}</option>
          <option value="A2">{t("subscribe.profile.level.A2")}</option>
          <option value="B1">{t("subscribe.profile.level.B1")}</option>
          <option value="B2">{t("subscribe.profile.level.B2")}</option>
          <option value="C1">{t("subscribe.profile.level.C1")}</option>
          <option value="C2">{t("subscribe.profile.level.C2")}</option>
        </select>
        <button className="subscribe-btn">{t("subscribe.confirm")}</button>
      </div>
    </div>
  );
};

export default ProfileSubmit;
