import { create } from 'zustand';
import { ChoiceOption, WyrQuestion } from '@/features/games/types/gameTypes';

type GameStoreState = {
  currentGame: string | null;
  currentQuestion: WyrQuestion | null;
  userAnswer: ChoiceOption | null;
  partnerAnswer: ChoiceOption | null;
  setCurrentGame: (gameId: string) => void;
  setQuestion: (question: WyrQuestion) => void;
  setAnswers: (userAnswer: ChoiceOption, partnerAnswer: ChoiceOption) => void;
  resetRound: () => void;
};

export const useGameStore = create<GameStoreState>((set) => ({
  currentGame: null,
  currentQuestion: null,
  userAnswer: null,
  partnerAnswer: null,
  setCurrentGame: (gameId) =>
    set({
      currentGame: gameId,
      currentQuestion: null,
      userAnswer: null,
      partnerAnswer: null,
    }),
  setQuestion: (question) => set({ currentQuestion: question, userAnswer: null, partnerAnswer: null }),
  setAnswers: (userAnswer, partnerAnswer) => set({ userAnswer, partnerAnswer }),
  resetRound: () => set({ currentQuestion: null, userAnswer: null, partnerAnswer: null }),
}));
