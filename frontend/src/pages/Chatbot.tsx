import type { JSX } from "react";
import "@styles/pages/Chatbot.css";
import UserQuery from "@/features/chatbot/components/UserQuery";
import Response from "@/features/chatbot/components/Response";
import Input from "@/features/chatbot/components/Input";

const Chatbot = (): JSX.Element => {
  return (
    <div className="chatbot">
      <div className="chatbot__body">
        <div className="chatbot__body-container">
          <div className="chatbot__body-content">
            <UserQuery />
            <Response />
            <UserQuery />
            <Response />
            <UserQuery />
            <Response />
            <UserQuery />
            <Response />
          </div>
        </div>
      </div>
      <div className="chatbot__footer">
        <div className="chatbot__footer-container">
          <Input />
        </div>
        <div className="chatbot__footer-infomation">
          <p>
            eMastery có thể mắc sai sót, vì vậy, hãy xác minh các câu trả lời
            của eMastery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
