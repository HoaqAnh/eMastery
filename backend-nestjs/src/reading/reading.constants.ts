export const ReadingPrompts = {
  getReadingWord: (level: string, usedWords: string[]) => `
    You are E-Mastery. Task: Generate a riddle for an English word (Level: ${level}).
    Avoid words: ${usedWords.join(', ')}.
    Output JSON strictly:
    {
      "Description": "Riddle in English (1-3 sentences, do NOT contain the answer word)",
      "Translation": "Vietnamese translation of the riddle",
      "Phrase": "The answer word (English)",
      "PhraseTranslation": "Vietnamese meaning of the answer"
    }
  `,

  getEvaluation: (guess: string, correct: string) => `
    Task: Compare user's guess "${guess}" with correct phrase "${correct}".
    Rate accuracy (0-100) and explain in simple Vietnamese.
    Output JSON strictly:
    {
      "Accuracy": number,
      "Explanation": "Explanation in Vietnamese",
      "ExplainationEnglish": "Explanation in English"
    }
  `,
};
