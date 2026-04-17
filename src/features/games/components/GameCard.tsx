import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/core/theme';
import { GameDefinition } from '@/features/games/types/gameTypes';

type GameCardProps = {
  game: GameDefinition;
  onPress: () => void;
};

export function GameCard({ game, onPress }: GameCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed, !game.isReady && styles.cardDisabled]}
      disabled={!game.isReady}
    >
      <View>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description}>{game.description}</Text>
      </View>
      <Text style={[styles.cta, !game.isReady && styles.comingSoon]}>{game.isReady ? 'Play' : 'Soon'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    backgroundColor: colors.surfaceElevated,
  },
  cardDisabled: {
    opacity: 0.55,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    maxWidth: 240,
    lineHeight: 20,
  },
  cta: {
    color: colors.accentSoft,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  comingSoon: {
    color: colors.textMuted,
  },
});
