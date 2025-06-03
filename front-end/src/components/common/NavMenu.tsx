import { type JSX, useState } from "react";
import Button from "@/components/common/Button";
import "@styles/components/NavMenu.css";
import { useTranslation } from "react-i18next";
import { MenuIcon, WritingIcon, QuizIcon, ChatBotIcon } from "./Icons";

const NavMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`nav-menu-expandable ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="nav-menu-items-left">
        <Button
          className="btn nav-menu-item"
          IconComponent={WritingIcon}
          BtnMenuText={t("navMenu.writingPractice")}
        />
        <Button
          className="btn nav-menu-item"
          IconComponent={QuizIcon}
          BtnMenuText={t("navMenu.puzzleSolving")}
        />
      </div>

      {isExpanded ? (
        <span />
      ) : (
        <Button
          className="btn nav-menu-trigger"
          //   IconComponent={MenuIcon}
          BtnMenuText={!isExpanded ? t("navMenu.features") : " "}
        />
      )}

      <div className="nav-menu-items-right">
        <Button
          className="btn nav-menu-item"
          IconComponent={ChatBotIcon}
          BtnMenuText={t("navMenu.aiAssistant")}
        />
        <Button
          className="btn nav-menu-item"
          IconComponent={ChatBotIcon}
          BtnMenuText={t("navMenu.aiAssistant")}
        />
      </div>
    </div>
  );
};

export default NavMenu;
