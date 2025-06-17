import { type JSX } from "react";
import FuzzyText from "@/components/common/FuzzyText";
import "@styles/pages/NotFoundPage.css";

const NotFoundPage = (): JSX.Element => (
  <div className="notfoundpage">
    <div className="notfoundpage__container">
      <div className="notfoundpage__title">
        <FuzzyText baseIntensity={0.1} hoverIntensity={0.5} enableHover={true}>
          404
        </FuzzyText>
      </div>
      <div className="notfoundpage__content">
        <FuzzyText baseIntensity={0.1} hoverIntensity={0.5} enableHover={true}>
          not found
        </FuzzyText>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
