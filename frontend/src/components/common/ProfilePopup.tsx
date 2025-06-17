import { type JSX, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useRegistration } from "@/context/RegistrationContext";
import { useApiKeyCheck } from "@/features/subscribe/hooks/useApiKeyCheck";
import { CloseIcon } from "@/components/common/Icons";
import "@styles/components/ProfilePopup.css";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileData {
  apiKey: string;
  fullName: string;
  age: string;
  gender: string;
  level: string;
}

interface ProfileErrors {
  apiKey?: string;
  fullName?: string;
  age?: string;
  gender?: string;
  level?: string;
}

const ProfilePopup = ({
  isOpen,
  onClose,
}: ProfilePopupProps): JSX.Element | null => {
  const { t } = useTranslation();
  const { registrationData, updateRegistrationData } = useRegistration();
  const {
    isLoading: isCheckingApiKey,
    error: apiKeyError,
    validateApiKey,
    resetApiKeyValidation,
  } = useApiKeyCheck();

  const [formData, setFormData] = useState<ProfileData>({
    apiKey: "",
    fullName: "",
    age: "",
    gender: "",
    level: "",
  });
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        apiKey: registrationData.apiKey || "",
        fullName: registrationData.fullName || "",
        age: registrationData.age || "",
        gender: registrationData.gender || "",
        level: registrationData.level || "",
      });
      setErrors({});
      resetApiKeyValidation();
    }
  }, [isOpen, registrationData, resetApiKeyValidation]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (name === "apiKey") {
      resetApiKeyValidation();
    }
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: ProfileErrors = {};
    let isValid = true;

    // API Key Validation
    if (formData.apiKey !== registrationData.apiKey) {
      const isKeyValid = await validateApiKey(formData.apiKey);
      if (!isKeyValid) {
        newErrors.apiKey =
          apiKeyError || t("subscribe.api.error.keyFormatError");
        isValid = false;
      }
    } else if (!formData.apiKey) {
      newErrors.apiKey = t("subscribe.api.error.keyRequired");
      isValid = false;
    }

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = t("subscribe.google.error.nameRequired");
      isValid = false;
    } else if (
      formData.fullName.trim().length < 3 ||
      formData.fullName.trim().length > 30
    ) {
      newErrors.fullName = t("subscribe.google.error.nameLengthError");
      isValid = false;
    }

    // Age Validation
    if (!formData.age) {
      newErrors.age = t("subscribe.profile.error.ageRequired");
      isValid = false;
    } else if (
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = t("subscribe.profile.error.ageFormatError");
      isValid = false;
    }

    // Gender and Level Validation
    if (!formData.gender) {
      newErrors.gender = t("subscribe.profile.error.genderRequired");
      isValid = false;
    }
    if (!formData.level) {
      newErrors.level = t("subscribe.profile.error.levelRequired");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid && Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isFormValid = await validateForm();

    if (isFormValid) {
      updateRegistrationData(formData);
      toast.success(t("userProfile.profilePopup.success"));
      onClose();
    } else {
      toast.error(t("userProfile.profilePopup.error"));
    }

    setIsSubmitting(false);
  };

  const isLoading = isCheckingApiKey || isSubmitting;

  return (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <div className="profile-popup__header">
          <h3 className="profile-popup__title">{t("userProfile.profilePopup.title")}</h3>
          <button
            className="profile-popup__close-btn"
            onClick={onClose}
            title={t("dictionary.history.closePlaceholder")}
          >
            {CloseIcon}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-popup__form">
          {/* API Key */}
          <div className="profile-popup__form-group">
            <label htmlFor="apiKey">{t("userProfile.profilePopup.apiKey")}</label>
            <input
              id="apiKey"
              name="apiKey"
              type="password"
              value={formData.apiKey}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder={t("subscribe.api.placeholder")}
            />
            {errors.apiKey && (
              <p className="form-error-message">{errors.apiKey}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="profile-popup__form-group">
            <label htmlFor="fullName">{t("userProfile.profilePopup.fullName")}</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder={t("subscribe.google.placeholder")}
            />
            {errors.fullName && (
              <p className="form-error-message">{errors.fullName}</p>
            )}
          </div>

          {/* Age */}
          <div className="profile-popup__form-group">
            <label htmlFor="age">{t("subscribe.profile.age")}</label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="e.g., 25"
            />
            {errors.age && <p className="form-error-message">{errors.age}</p>}
          </div>

          {/* Gender */}
          <div className="profile-popup__form-group">
            <label htmlFor="gender">{t("subscribe.profile.sex.title")}</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              <option value="" disabled>
                {t("subscribe.profile.sex.title")}
              </option>
              <option value="male">{t("subscribe.profile.sex.male")}</option>
              <option value="female">
                {t("subscribe.profile.sex.female")}
              </option>
              <option value="other">{t("subscribe.profile.sex.unsex")}</option>
            </select>
            {errors.gender && (
              <p className="form-error-message">{errors.gender}</p>
            )}
          </div>

          {/* Level */}
          <div className="profile-popup__form-group">
            <label htmlFor="level">{t("subscribe.profile.level.title")}</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              disabled={isLoading}
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
            {errors.level && (
              <p className="form-error-message">{errors.level}</p>
            )}
          </div>

          <div className="profile-popup__actions">
            <button
              type="button"
              className="btn__profile-popup-cancel"
              onClick={onClose}
              disabled={isLoading}
            >
              {t("userProfile.profilePopup.cancel")}
            </button>
            <button
              type="submit"
              className="btn__profile-popup-save"
              disabled={isLoading}
            >
              {isLoading ? t("subscribe.loading") : t("userProfile.profilePopup.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePopup;
