import React from 'react';
import { Text, TextInput, View } from 'react-native';
import MainLogo from '../components/MainLogo';
import { loginStyles } from '../theme/loginTheme';

const LoginScreen = () => {
  return (
    <>
      <View style={loginStyles.brandContainer}>
        {/* Logo and background */}
        <View style={loginStyles.brandContainer}>
          <MainLogo />
        </View>

        {/* Keyboard avoid view */}
        <View style={{ ...loginStyles.container, height: 550 }}>
          <Text style={loginStyles.title}>Iniciar Sesión</Text>
          <Text>Email</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="#777"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={loginStyles.inputField}
          />
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
