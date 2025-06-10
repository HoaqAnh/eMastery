import type { JSX } from "react";
import "@styles/pages/Chatbot.css";
import { UserIcon } from "@/components/common/Icons";

const Chatbot = (): JSX.Element => {
  return (
    <div className="chatbot">
      <div className="chatbot__body">
        <div className="chatbot__body-container">
          <div className="chatbot__body-bot__logo">{UserIcon}</div>
          <div className="chatbot__body-content">
            <div className="user">
              <div className="user__query">
                <p>
                  AIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXc
                </p>
              </div>
            </div>
            <div className="bot">
              <div className="bot__name">eMastery</div>
              <div className="bot__response">
                AIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXcAIzaSyCEGcXqBcRgWDS5Moyg2PNjWA--B7EvxXc
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chatbot__footer">
        <div className="chatbot__footer-input__area">
          {/* <input type="text" /> */}
        </div>
        <div className="chatbot__footer-infomation"></div>
      </div>
    </div>
  );
};

export default Chatbot;
