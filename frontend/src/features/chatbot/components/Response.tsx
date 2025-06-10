import type { JSX } from "react";
import { UserIcon } from "@/components/common/Icons";

const Response = (): JSX.Element => {
  return (
    <div className="response">
      <div className="response__info">
        <div className="response__info-bot__logo">{UserIcon}</div>
        <div className="response__info-bot__name">eMastery</div>
      </div>
      <div className="response__content">
        <div className="response__content-container">
          <p>
            xin chào! Tôi là eMastery, trợ lý học tập của bạn. Tôi có thể giúp
            bạn tìm hiểu về các chủ đề như lập trình, khoa học máy tính, và phát
            triển kỹ năng mềm. Bạn có thể hỏi tôi bất kỳ câu hỏi nào liên quan
            đến học tập, và tôi sẽ cố gắng cung cấp cho bạn thông tin và tài
            nguyên hữu ích.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Response;
