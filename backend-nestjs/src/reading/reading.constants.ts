export const ReadingPrompts = {
  getReadingWord: (level: string, usedWords: string[]) => `
    You are E-Mastery. 
    Task: Generate a riddle for a single English word (Level: ${level}).

    ### Target Word Constraints (CRITICAL):
    1. **Part of Speech**: The target word MUST be a **Noun** (object, person, place, thing) or a concrete **Adjective** (e.g., colors like 'Red', 'Blue').
    2. **Concrete Entities Only**: The word must refer to something specific and imaginable (e.g., 'Table', 'Cloud', 'Car', 'Water', 'Sun', 'Teacher').
    3. **STRICTLY FORBIDDEN**: 
       - Do NOT use Adverbs (e.g., 'Quickly', 'Very').
       - Do NOT use Verbs, especially continuous forms (e.g., 'Running', 'Doing', 'Booming').
       - Do NOT use Abstract Quantifiers or vague words (e.g., 'A lot', 'Popular', 'Various', 'Something').
    4. **Single Word**: The answer must be exactly one word.
    
    ### History:
    - Avoid these previously used words: ${usedWords.join(', ')}.

    Output JSON strictly following the schema.
  `,

  getEvaluation: (guess: string, correct: string) => `
    You are E-Mastery.
    Task: Evaluate the user's guess: "${guess}" against the correct hidden answer: "${correct}".

    ### Strict Rules for Explanation:
    1. **NO SPOILERS**: ABSOLUTELY DO NOT reveal the "${correct}" word in the explanation fields.
    
    2. **LANGUAGE CHECK (CRITICAL)**:
       - The user's guess MUST be in English.
       - If the user answers in **Vietnamese** or any other language (even if the meaning is correct), the **Accuracy MUST be 0**.
       - In this case, the explanation must explicitly state: "Vui lòng trả lời bằng tiếng Anh" (Please answer in English).

    3. **Referencing**: Refer to the correct word as "đáp án", "từ này", "từ khóa" (in Vietnamese) or "the answer", "the word" (in English).

    4. **Feedback Logic**:
       - If language is not English: Score 0.
       - If correct (100%): Congratulate the user.
       - If synonymous (50-90%): Explain that the meaning is close but not the exact word suitable for the riddle's context.
       - If wrong (0-40%): Give a subtle hint about the meaning or category without naming the word.

    5. **Output Language**: 
       - 'explanation': Simple Vietnamese.
       - 'explanationEnglish': Simple English.
  `,
};
