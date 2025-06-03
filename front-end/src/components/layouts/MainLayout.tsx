import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import NavActions from "@/components/NavActions";
import { useTranslation } from "react-i18next";
import "@styles/layouts/MainLayout.css";
import Button from "@/components/common/Button";

const MainLayout = (): JSX.Element => {
  const { t } = useTranslation();

  const handleChatBotClick = () => {
    console.log("Chatbot button clicked");
  };

  // SVG
  const ChatBotIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm40-160h240q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640Z" />
    </svg>
  );

  const MenuIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );

  return (
    <div className="main-layout">
      <header>
        <div className="nav-background" />
        <nav>
          <button className="logo" data-text="Awesome">
            <span className="actual-text">&nbsp;eMastery&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;eMastery&nbsp;
            </span>
          </button>
          <div className="menu">
            <div className="menu-options">
              <Button
                className="btn btn-theme"
                IconComponent={MenuIcon}
                BtnMenuText={t("settings.theme")}
              />
            </div>
            <Button
              className="btn btn-menu_actions"
              IconComponent={MenuIcon}
              onClick={handleChatBotClick}
            />
            <div className="menu-actions">
              <Button
                className="btn btn-chatbot"
                IconComponent={ChatBotIcon}
                BtnMenuText={"Chatbot"}
                onClick={handleChatBotClick}
              />
            </div>
          </div>
          <div className="nav-actions">
            <NavActions />
          </div>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
