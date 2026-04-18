import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameSelectScreen } from '@/features/games/screens/GameSelectScreen';
import { GameScreen } from '@/features/games/screens/GameScreen';
import { RootStackParamList } from './types';
import { colors, typography } from '@/core/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="GameSelect"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.semibold,
        },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="GameSelect"
        component={GameSelectScreen}
        options={{ title: 'Bondly' }}
      />
      <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Game Night' }} />
    </Stack.Navigator>
  );
}
