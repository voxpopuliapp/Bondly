import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { RootStackParamList } from '@/core/navigation/types';
import { ScreenContainer } from '@/core/components/ScreenContainer';
import { getGameById } from '@/features/games/data/games';
import { useWouldYouRatherGame } from '@/features/games/hooks/useWouldYouRatherGame';
import { OptionButton } from '@/features/games/components/OptionButton';
import { ChoiceOption } from '@/features/games/types/gameTypes';
import { colors, radius, spacing, typography } from '@/core/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export function GameScreen({ route }: Props): React.JSX.Element {
  const { gameId } = route.params;

  const game = useMemo(() => getGameById(gameId), [gameId]);
  const { currentQuestion, userAnswer, partnerAnswer, didMatch, choose, loadNextQuestion } = useWouldYouRatherGame();

  const handleChoose = (option: ChoiceOption) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    choose(option);
  };

  if (!game) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>Game not found.</Text>
      </ScreenContainer>
    );
  }

  if (!game.isReady) {
    return (
      <ScreenContainer>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description}>This game is on the way. Pick another for now.</Text>
      </ScreenContainer>
    );
  }

  if (!currentQuestion) {
    return (
      <ScreenContainer>
        <Text style={styles.description}>Loading question...</Text>
      </ScreenContainer>
    );
  }

  const showResult = userAnswer !== null;

  return (
    <ScreenContainer>
      <View style={styles.questionWrap}>
        <Text style={styles.overline}>Would You Rather</Text>
        <Text style={styles.title}>Choose your answer.</Text>
      </View>

      <OptionButton
        option="A"
        text={currentQuestion.optionA}
        selectedByUser={userAnswer === 'A'}
        selectedByPartner={showResult && partnerAnswer === 'A'}
        disabled={showResult}
        onPress={handleChoose}
      />
      <OptionButton
        option="B"
        text={currentQuestion.optionB}
        selectedByUser={userAnswer === 'B'}
        selectedByPartner={showResult && partnerAnswer === 'B'}
        disabled={showResult}
        onPress={handleChoose}
      />

      {showResult ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>{didMatch ? 'You matched 💞' : 'Different answers ✨'}</Text>
          <Text style={styles.resultText}>
            {didMatch
              ? 'You picked the same option this round.'
              : 'You chose differently. Ask why your partner picked theirs.'}
          </Text>
        </View>
      ) : null}

      <Pressable style={[styles.nextButton, !showResult && styles.nextButtonDisabled]} disabled={!showResult} onPress={loadNextQuestion}>
        <Text style={styles.nextButtonText}>Next Question</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  questionWrap: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  overline: {
    color: colors.accentSoft,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.sizes.md,
  },
  resultCard: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  resultTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  resultText: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  nextButtonDisabled: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextButtonText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});
