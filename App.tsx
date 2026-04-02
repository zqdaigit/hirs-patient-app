import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

const theme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, primary: colors.primary, background: colors.background, surface: colors.surface, error: colors.error },
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
