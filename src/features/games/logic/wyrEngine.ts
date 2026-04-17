import { ChoiceOption, WyrQuestion } from '@/features/games/types/gameTypes';

export type WyrRoundResult = {
  userAnswer: ChoiceOption;
  partnerAnswer: ChoiceOption;
  matched: boolean;
};

export function getRandomQuestion(questions: WyrQuestion[], previousQuestionId?: string): WyrQuestion {
  const pool = questions.filter((question) => question.id !== previousQuestionId);
  const source = pool.length > 0 ? pool : questions;
  const randomIndex = Math.floor(Math.random() * source.length);
  const randomQuestion = source[randomIndex];

  if (!randomQuestion) {
    throw new Error('No questions available for Would You Rather.');
  }

  return randomQuestion;
}

export function simulatePartnerAnswer(): ChoiceOption {
  return Math.random() >= 0.5 ? 'A' : 'B';
}

export function evaluateRound(userAnswer: ChoiceOption, partnerAnswer: ChoiceOption): WyrRoundResult {
  return {
    userAnswer,
    partnerAnswer,
    matched: userAnswer === partnerAnswer,
  };
}
