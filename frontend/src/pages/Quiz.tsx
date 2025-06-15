import type { JSX } from "react";
import Input from "@/features/quiz/components/Input";
import DescQuiz from "@/features/quiz/components/DescQuiz";
import Progress from "@/features/quiz/components/Progress";
import "@styles/pages/Quiz.css";

const Quiz = (): JSX.Element => {
  return (
    <div className="quiz">
      <div className="quiz__body">
        <div className="quiz__body-container">
          <div className="quiz__body-descquiz">
            <DescQuiz />
          </div>
          <div className="quiz__body-content">
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
            <Progress />
          </div>
        </div>
      </div>
      <div className="quiz__footer">
        <div className="quiz__footer-container">
          <Input />
        </div>
        <div className="quiz__footer-infomation">
          <p>
            eMastery có thể mắc sai sót, vì vậy, hãy xác minh các câu trả lời
            của eMastery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
