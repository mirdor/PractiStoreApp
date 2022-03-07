import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import AuthProvider from './src/context/AuthContext';

const AppState = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
}
