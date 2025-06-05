import { type JSX, useState } from "react";
import ApiKeySubmit from "@/features/subscribe/components/ApiKeySubmit";
import ProfileSubmit from "@/features/subscribe/components/ProfileSubmit";
import SubWithGoogle from "@/features/subscribe/components/SubWithGoogle";
import "@styles/pages/Subscribe.css";

type Step = "apiKey" | "google" |"profile";

const Subscribe = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<Step>("apiKey");

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
