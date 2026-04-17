import { useCallback, useEffect, useMemo } from 'react';
import { useGameStore } from '@/state/gameStore';
import { wyrQuestions } from '@/features/games/data/wyrQuestions';
import { evaluateRound, getRandomQuestion, simulatePartnerAnswer } from '@/features/games/logic/wyrEngine';
import { ChoiceOption } from '@/features/games/types/gameTypes';

export function useWouldYouRatherGame() {
  const currentQuestion = useGameStore((state) => state.currentQuestion);
  const userAnswer = useGameStore((state) => state.userAnswer);
  const partnerAnswer = useGameStore((state) => state.partnerAnswer);
  const setQuestion = useGameStore((state) => state.setQuestion);
  const setAnswers = useGameStore((state) => state.setAnswers);

  const loadNextQuestion = useCallback(() => {
    const nextQuestion = getRandomQuestion(wyrQuestions, currentQuestion?.id);
    setQuestion(nextQuestion);
  }, [currentQuestion?.id, setQuestion]);

  const choose = useCallback(
    (choice: ChoiceOption) => {
      if (!currentQuestion || userAnswer) {
        return;
      }
      const partnerChoice = simulatePartnerAnswer();
      const round = evaluateRound(choice, partnerChoice);
      setAnswers(round.userAnswer, round.partnerAnswer);
    },
    [currentQuestion, setAnswers, userAnswer],
  );

  useEffect(() => {
    if (!currentQuestion) {
      loadNextQuestion();
    }
  }, [currentQuestion, loadNextQuestion]);

  const didMatch = useMemo(() => {
    if (!userAnswer || !partnerAnswer) {
      return null;
    }

    return userAnswer === partnerAnswer;
  }, [partnerAnswer, userAnswer]);

  return {
    currentQuestion,
    userAnswer,
    partnerAnswer,
    didMatch,
    choose,
    loadNextQuestion,
  };
}
