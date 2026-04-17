import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing } from '@/core/theme';

type ScreenContainerProps = ViewProps;

export function ScreenContainer({ children, style, ...props }: ScreenContainerProps): React.JSX.Element {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
});
