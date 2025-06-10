import { type JSX, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeySubmit from "@/features/subscribe/components/ApiKeySubmit";
import ProfileSubmit from "@/features/subscribe/components/ProfileSubmit";
import SubWithGoogle from "@/features/subscribe/components/SubWithGoogle";
import { useRegistration } from "@/context/RegistrationContext";
import "@styles/pages/Subscribe.css";

type Step = "apiKey" | "google" | "profile";

const Subscribe = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<Step>("apiKey");
  const { registrationData } = useRegistration();
  const navigate = useNavigate();

  useEffect(() => {
    const { apiKey, fullName, age, gender, level } = registrationData;

    if (apiKey && fullName && age && gender && level) {
      console.log("Đã đủ thông tin, chuyển hướng về trang chủ.");
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
  }, [registrationData, navigate]);

  const handleGoToGoogleStep = () => {
    setCurrentStep("profile");
  };

  const handleGoToProfileStep = () => {
    setCurrentStep("google");
  };

  return (
    <div className="subscribe">
      {currentStep === "apiKey" && (
        <ApiKeySubmit onNext={handleGoToProfileStep} />
      )}
      {currentStep === "google" && (
        <SubWithGoogle onNext={handleGoToGoogleStep} />
      )}
      {currentStep === "profile" && <ProfileSubmit />}
    </div>
  );
};

export default Subscribe;
