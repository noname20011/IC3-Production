export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const pickRandom = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Hoán vị
  }
  return shuffled.slice(0, count);
};

export const shuffleQuestionAnswers = (question: any): any => {
  switch (question.type) {
    case "multiple":
    case "single":
    case "reorder":
      return {
        ...question,
        options: shuffleArray(question.options),
      };
    case "match": {
      // lấy toàn bộ left.value
      const shuffledLeftValues = shuffleArray(
        question.pairs.map((pair: any) => pair.left.value),
      );

      return {
        ...question,
        pairs: question.pairs.map((pair: any, index: number) => ({
          ...pair,
          left: {
            ...pair.left,
            value: shuffledLeftValues[index],
          },
        })),
      };
    }

    default:
      return question;
  }
};

export const pickRandomQuestions = (questions: any[], count: number) => {
  return shuffleArray(questions).slice(0, count).map(shuffleQuestionAnswers);
};
