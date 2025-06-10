import type { JSX } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UserIcon } from "@/components/common/Icons";

interface ResponseProps {
  content: string;
}

const Response = ({ content }: ResponseProps): JSX.Element => {
  return (
    <div className="response">
      <div className="response__info">
        <div className="response__info-bot__logo">{UserIcon}</div>
        <div className="response__info-bot__name">eMastery</div>
      </div>
      <div className="response__content">
        <div className="response__content-container">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Response;
