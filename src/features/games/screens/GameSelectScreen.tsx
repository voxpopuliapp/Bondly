import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/core/components/ScreenContainer';
import { RootStackParamList } from '@/core/navigation/types';
import { GameCard } from '@/features/games/components/GameCard';
import { gamesRegistry } from '@/features/games/data/games';
import { useGameStore } from '@/state/gameStore';
import { colors, spacing, typography } from '@/core/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'GameSelect'>;

export function GameSelectScreen({ navigation }: Props): React.JSX.Element {
  const setCurrentGame = useGameStore((state) => state.setCurrentGame);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Tonight, pick your vibe.</Text>
        <Text style={styles.subtitle}>A tiny private space built just for two.</Text>
      </View>

      <FlatList
        data={gamesRegistry}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => {
              setCurrentGame(item.id);
              navigation.navigate('Game', { gameId: item.id });
            }}
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
  },
});
