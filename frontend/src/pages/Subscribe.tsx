import { type JSX, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeySubmit from "@/features/subscribe/components/ApiKeySubmit";
import ProfileSubmit from "@/features/subscribe/components/ProfileSubmit";
import SubWithGoogle from "@/features/subscribe/components/SubWithGoogle";
import "@styles/pages/Subscribe.css";
import {
  RegistrationProvider,
  useRegistration,
} from "@/context/RegistrationContext";
import { useGoogleCallback } from "@features/subscribe/hooks/useGoogleCallback";
import toast, { Toaster } from "react-hot-toast";

type Step = "apiKey" | "google" | "profile" | "loading";

const SubscribeFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>("loading");
  const { registrationData, updateRegistrationData } = useRegistration();
  const navigate = useNavigate();

  const {
    isLoading: isVerifying,
    error: authError,
    authData,
  } = useGoogleCallback();

  useEffect(() => {
    if (
      authData?.success &&
      authData.user?.name &&
      !registrationData.fullName
    ) {
      toast.success("Đăng nhập Google thành công!");
      updateRegistrationData({ fullName: authData.user.name });
    } else if (authError) {
      toast.error(authError);
    }
  }, [authData, authError, updateRegistrationData, registrationData]);

  useEffect(() => {
    if (isVerifying) {
      setCurrentStep("loading");
      return;
    }

    const { apiKey, fullName, age, gender, level } = registrationData;

    if (apiKey && fullName && age && gender && level) {
      navigate("/");
      return;
    }
    if (!apiKey) {
      setCurrentStep("apiKey");
      return;
    }
    if (!fullName) {
      setCurrentStep("google");
      return;
    }
    if (!age || !gender || !level) {
      setCurrentStep("profile");
      return;
    }
  }, [registrationData, navigate, isVerifying]);

  const handleGoToGoogleStep = () => {
    setCurrentStep("profile");
  };

  const handleGoToProfileStep = () => {
    setCurrentStep("google");
  };

  switch (currentStep) {
    case "loading":
      return (
        <div className="subscribe">
          <div className="card">
            <span className="card__title">Đang xác thực...</span>
            <p className="card__content">
              Vui lòng chờ trong khi chúng tôi hoàn tất đăng nhập Google của
              bạn.
            </p>
          </div>
        </div>
      );
    case "apiKey":
      return <ApiKeySubmit onNext={handleGoToProfileStep} />;
    case "google":
      return <SubWithGoogle onNext={handleGoToGoogleStep} />;
    case "profile":
      return <ProfileSubmit />;
    default:
      return <div>Đang tải...</div>;
  }
};

const Subscribe = (): JSX.Element => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="subscribe">
        <RegistrationProvider>
          <SubscribeFlow />
        </RegistrationProvider>
      </div>
    </>
  );
};

export default Subscribe;
