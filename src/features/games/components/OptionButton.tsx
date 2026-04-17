import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChoiceOption } from '@/features/games/types/gameTypes';
import { colors, radius, spacing, typography } from '@/core/theme';

type OptionButtonProps = {
  option: ChoiceOption;
  text: string;
  selectedByUser: boolean;
  selectedByPartner: boolean;
  disabled: boolean;
  onPress: (option: ChoiceOption) => void;
};

export function OptionButton({
  option,
  text,
  selectedByUser,
  selectedByPartner,
  disabled,
  onPress,
}: OptionButtonProps): React.JSX.Element {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onPress(option)}
      style={({ pressed }) => [
        styles.base,
        pressed && !disabled && styles.pressed,
        selectedByUser && styles.userSelected,
        selectedByPartner && styles.partnerSelected,
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.badge}>{option}</Text>
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <View style={styles.tags}>
        {selectedByUser ? <Text style={styles.userTag}>You</Text> : null}
        {selectedByPartner ? <Text style={styles.partnerTag}>Partner</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pressed: {
    backgroundColor: colors.surfaceElevated,
    transform: [{ scale: 0.99 }],
  },
  userSelected: {
    borderColor: colors.accent,
    backgroundColor: '#351927',
  },
  partnerSelected: {
    borderColor: colors.success,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.text,
    backgroundColor: colors.surfaceElevated,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.sm,
    lineHeight: 28,
  },
  optionText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    flexShrink: 1,
    lineHeight: 23,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  userTag: {
    color: colors.accentSoft,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
  partnerTag: {
    color: colors.success,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
});
