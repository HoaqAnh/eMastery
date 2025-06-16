import { useState, type JSX } from "react";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/features/dictionary/components/Input";
import { useTranslation } from "react-i18next";
import LeftSide from "@/features/dictionary/components/LeftSide";
import Container from "@/features/dictionary/components/Container";
import { useRegistration } from "@/context/RegistrationContext";
import { useDictionary } from "@/features/dictionary/hooks/useDictionary";
import Error from "@/components/common/Error";
import LeftSideSkeleton from "@/features/dictionary/components/LeftSideSkeleton";
import ContainerSkeleton from "@/features/dictionary/components/ContainerSkeleton";
import { useSearchHistory } from "@/features/dictionary/hooks/useSearchHistory";
import HistoryPopup from "@/features/dictionary/components/HistoryPopup";
import "@styles/pages/Dictionary.css";

type DictionaryTab =
  | "meaning"
  | "grammarUsage"
  | "phrasesAndIdioms"
  | "synonymsAndAntonyms"
  | "funFactsAndTips";

const Dictionary = (): JSX.Element => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<DictionaryTab>("meaning");

  const { registrationData } = useRegistration();
  const { data, isLoading, error, fetchTranslation } = useDictionary();

  const { history, addWordToHistory, clearHistory } = useSearchHistory();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleSearch = (word: string) => {
    const validWordRegex = /^[a-zA-Z]+$/;
    if (!validWordRegex.test(word)) {
      toast.error(t("dictionary.error.valid"));
      return;
    }

    if (!registrationData.apiKey) {
      console.error("API key is missing!");
      toast.error(t("dictionary.error.apiKey"));
      return;
    }

    fetchTranslation({ word, apiKey: registrationData.apiKey });
    addWordToHistory(word);
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleHistoryWordClick = (word: string) => {
    handleSearch(word);
    setIsHistoryOpen(false);
  };

  const handleClearHistory = () => {
    clearHistory();
    setIsHistoryOpen(false);
  };

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
      ? t("dictionary.notFound.title") + ` "${data.word}"`
      : t("dictionary.title");
    const placeholderDescription = data
      ? t("dictionary.notFound.description")
      : t("dictionary.welcome");

    return (
      <div className="dictionary-placeholder">
        <h1>{placeholderTitle}</h1>
        <p>{placeholderDescription}</p>
      </div>
    );
  };

  return (
    <div className="dictionary">
      <Toaster position="top-center" reverseOrder={false} />
      <HistoryPopup
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onWordClick={handleHistoryWordClick}
        onClearHistory={handleClearHistory}
      />

      <div className="dictionary__body">{renderContent()}</div>
      <div className="dictionary__footer">
        <div className="dictionary__footer-container">
          <Input
            onSearch={handleSearch}
            isLoading={isLoading}
            onHistoryClick={() => setIsHistoryOpen(true)}
          />
        </div>
        <div className="dictionary__footer-infomation">
          <p>{t("chatbot.info")}</p>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
