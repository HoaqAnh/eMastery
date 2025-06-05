import type { JSX } from "react";
import { useTranslation } from "react-i18next";

const ProfileSubmit = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <div>
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.profile.content")}</p>
      </div>
      <div className="card__form">
        {/* Gender */}
        <select
          className="card__form-select"
          aria-label={t("subscribe.profile.sex.title")}
        >
          <option value="" disabled selected>
            {t("subscribe.profile.sex.title")}
          </option>
          <option value="male">{t("subscribe.profile.sex.male")}</option>
          <option value="female">{t("subscribe.profile.sex.female")}</option>
          <option value="other">{t("subscribe.profile.sex.unsex")}</option>
        </select>

        {/* Level */}
        <select
          className="card__form-select"
          aria-label={t("subscribe.profile.level.title")}
        >
          <option value="" disabled selected>
            {t("subscribe.profile.level.title")}
          </option>
          <option value="beginner">
            {t("subscribe.profile.level.beginner")}
          </option>
          <option value="elementary">
            {t("subscribe.profile.level.elementary")}
          </option>
          <option value="intermediate">
            {t("subscribe.profile.level.intermediate")}
          </option>
          <option value="upperIntermediate">
            {t("subscribe.profile.level.upperIntermediate")}
          </option>
          <option value="advanced">
            {t("subscribe.profile.level.advanced")}
          </option>
          <option value="proficient">
            {t("subscribe.profile.level.proficient")}
          </option>
        </select>
        <button className="subscribe-btn">{t("subscribe.confirm")}</button>
      </div>
    </div>
  );
};

export default ProfileSubmit;
