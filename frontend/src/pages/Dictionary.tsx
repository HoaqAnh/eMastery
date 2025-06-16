import { useState, type JSX } from "react";
import Input from "@/features/dictionary/components/Input";
import { useTranslation } from "react-i18next";
import LeftSide from "@/features/dictionary/components/LeftSide";
import Container from "@/features/dictionary/components/Container";
import { useRegistration } from "@/context/RegistrationContext";
import { useDictionary } from "@/features/dictionary/hooks/useDictionary";
import Error from "@/components/common/Error";
import LeftSideSkeleton from "@/features/dictionary/components/LeftSideSkeleton";
import ContainerSkeleton from "@/features/dictionary/components/ContainerSkeleton";
import "@styles/pages/Dictionary.css";

type DictionaryTab =
  | "meaning"
  | "grammarUsage"
  | "phrasesAndIdioms"
  | "synonymsAndAntonyms"
  | "funFactsAndTips";

const Dictionary = (): JSX.Element => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<DictionaryTab>("meaning");

  const { registrationData } = useRegistration();
  const { data, isLoading, error, fetchTranslation } = useDictionary();

  const handleSearch = (word: string) => {
    if (!registrationData.apiKey) {
      console.error("API key is missing!");
      return;
    }
    fetchTranslation({ word, apiKey: registrationData.apiKey });
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  if (error) return <Error />;

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <LeftSideSkeleton />
          <ContainerSkeleton />
        </>
      );
    }

    if (data && data.explanation.meaning) {
      return (
        <>
          <LeftSide
            word={data.word}
            pronunciation={data.explanation.pronunciation || "N/A"}
            summary={data.explanation.summary || "N/A"}
          />
          <Container
            data={data.explanation}
            isExpanded={isExpanded}
            onToggleExpand={toggleExpand}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </>
      );
    }

    const placeholderTitle = data
      ? t("dictionary.notFound.title", "Không tìm thấy từ") + ` "${data.word}"`
      : t("dictionary.title", "Từ điển eMastery");
    const placeholderDescription = data
      ? t(
          "dictionary.notFound.description",
          "Vui lòng kiểm tra lại chính tả hoặc thử một từ khác."
        )
      : t(
          "dictionary.welcome",
          "Tra cứu từ vựng tiếng Anh để xem định nghĩa, phát âm, ví dụ và hơn thế nữa."
        );

    return (
      <div className="dictionary-placeholder">
        <h1>{placeholderTitle}</h1>
        <p>{placeholderDescription}</p>
      </div>
    );
  };

  return (
    <div className="dictionary">
      <div className="dictionary__body">{renderContent()}</div>
      <div className="dictionary__footer">
        <div className="dictionary__footer-container">
          <Input onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <div className="dictionary__footer-infomation">
          <p>{t("chatbot.info")}</p>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
