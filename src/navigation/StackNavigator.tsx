import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProtectedScreen from '../screens/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
  const { status } = useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
