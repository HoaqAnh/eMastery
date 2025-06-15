import type { JSX } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UserIcon } from "@/components/common/Icons";
import LoadingResponse from "@/components/common/LoadingResponse";

interface ResponseProps {
  content: string;
  isLoading: boolean;
}

const Response = ({ content, isLoading }: ResponseProps): JSX.Element => {
  return (
    <div className="response">
      <div className="response__info">
        <div className="response__info-bot__logo">{UserIcon}</div>
        <div className="response__info-bot__name">eMastery</div>
      </div>
      <div className="response__content">
        <div className="response__content-container">
          {isLoading ? (
            <LoadingResponse />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Response;
