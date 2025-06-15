import { type JSX, useEffect, useRef } from "react";
import { useChatbot } from "@features/chatbot/hooks/useChatbot";
import { useTranslation } from "react-i18next";
import Error from "@components/common/Error";
import UserQuery from "@/features/chatbot/components/UserQuery";
import Response from "@/features/chatbot/components/Response";
import Input from "@/features/chatbot/components/Input";

import "@styles/pages/Chatbot.css";

const Chatbot = (): JSX.Element => {
  const { messages, isLoading, error, sendMessage, clearChat } = useChatbot();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (error) {
    return <Error />;
  }

  return (
    <div className="chatbot">
      <div className="chatbot__body">
        <div className="chatbot__body-container">
          <div className="chatbot__body-content">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <UserQuery key={index} content={message.content} />
              ) : (
                <Response
                  key={index}
                  content={message.content}
                  isLoading={false}
                />
              )
            )}

            {isLoading && (
              <Response content={t("chatbot.loading")} isLoading={isLoading} />
            )}

            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
      <div className="chatbot__footer">
        <div className="chatbot__footer-container">
          <Input
            onSendMessage={sendMessage}
            isLoading={isLoading}
            onNewChat={clearChat}
          />
        </div>
        <div className="chatbot__footer-infomation">
          <p>{t("chatbot.info")}</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
