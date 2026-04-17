import { GameDefinition } from '@/features/games/types/gameTypes';

export const gamesRegistry: GameDefinition[] = [
  {
    id: 'would-you-rather',
    title: 'Would You Rather',
    description: 'Answer a playful dilemma and see what your partner picked.',
    type: 'async-choice',
    isReady: true,
  },
  {
    id: 'this-or-that',
    title: 'This or That',
    description: 'Fast rounds of tiny preferences. Coming soon.',
    type: 'placeholder',
    isReady: false,
  },
];

export function getGameById(gameId: string): GameDefinition | undefined {
  return gamesRegistry.find((game) => game.id === gameId);
}
