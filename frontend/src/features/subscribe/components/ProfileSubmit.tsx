import { useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { useRegistration } from "@/context/RegistrationContext";

interface ProfileErrors {
  age?: string;
  gender?: string;
  level?: string;
}

const ProfileSubmit = (): JSX.Element => {
  const { t } = useTranslation();
  const { updateRegistrationData } = useRegistration();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});

  const validate = (): boolean => {
    const newErrors: ProfileErrors = {};
    if (!age) {
      newErrors.age = t("subscribe.profile.error.ageRequired");
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = t("subscribe.profile.error.ageFormatError");
    } else if (Number(age) > 120) {
      newErrors.age = t("subscribe.profile.error.ageRangeError");
    }
    if (!gender) {
      newErrors.gender = t("subscribe.profile.error.genderRequired");
    }
    if (!level) {
      newErrors.level = t("subscribe.profile.error.levelRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    const isValid = validate();

    if (isValid) {
      const profileData = { age, gender, level };
      updateRegistrationData(profileData);
    }
  };

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__title">{t("subscribe.title")}</span>
        <p className="card__content">{t("subscribe.profile.content")}</p>
      </div>
      <div className="card__form">
        <input
          id="age"
          type="number"
          className="card__form input"
          placeholder={t("subscribe.profile.age")}
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            if (errors.age) setErrors((prev) => ({ ...prev, age: undefined }));
          }}
        />
        {errors.age && <p className="form-error-message">{errors.age}</p>}

        <select
          id="gender"
          className="card__form-select"
          aria-label={t("subscribe.profile.sex.title")}
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            if (errors.gender)
              setErrors((prev) => ({ ...prev, gender: undefined }));
          }}
        >
          <option value="" disabled>
            {t("subscribe.profile.sex.title")}
          </option>
          <option value="male">{t("subscribe.profile.sex.male")}</option>
          <option value="female">{t("subscribe.profile.sex.female")}</option>
          <option value="other">{t("subscribe.profile.sex.unsex")}</option>
        </select>
        {errors.gender && <p className="form-error-message">{errors.gender}</p>}

        <select
          id="level"
          className="card__form-select"
          aria-label={t("subscribe.profile.level.title")}
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
            if (errors.level)
              setErrors((prev) => ({ ...prev, level: undefined }));
          }}
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
        {errors.level && <p className="form-error-message">{errors.level}</p>}

        <button className="subscribe-btn" onClick={handleConfirm}>
          {t("subscribe.confirm")}
        </button>
      </div>
    </div>
  );
};

export default ProfileSubmit;
