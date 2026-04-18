export type GameType = 'async-choice' | 'placeholder';

export type GameDefinition = {
  id: string;
  title: string;
  description: string;
  type: GameType;
  isReady: boolean;
};

export type WyrQuestion = {
  id: string;
  optionA: string;
  optionB: string;
};

export type ChoiceOption = 'A' | 'B';
