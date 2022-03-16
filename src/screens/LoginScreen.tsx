import React, { useContext, useEffect } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MainLogo from "../components/MainLogo";
import { globalColors, loginStyles } from "../theme/loginTheme";
import useForm from "../hooks/useForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/StackNavigator";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";

type Props = NativeStackScreenProps<RootStackParams, "LoginScreen">;

const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  const { email, password, onChange } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!errorMessage.length) return;

    Alert.alert("Login incorrecto", errorMessage, [
      { text: "Ok", onPress: removeError },
    ]);
  }, [errorMessage]);

  const handleLogin = () => {
    console.log({ email, password });
    Keyboard.dismiss();
    signIn({ correo: email.trim(), password: password.trim() });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "red" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.brandContainer}>
          {/* Logo and background */}
          <View style={loginStyles.brandContainer}>
            <MainLogo />
          </View>
          {/* Keyboard avoid view */}

          <View style={{ ...loginStyles.container, height: 500 }}>
            <Text style={loginStyles.title}>Iniciar Sesión</Text>

            <Input
              label='Email'
              placeholder='Ingrese su email...'
              keyboardType='email-address'
              autoCorrect={false}
              value={email}
              onChangeText={(value) => onChange(value, "email")}
              onSubmitEditing={handleLogin}
            />

            <Input
              label='Contraseña'
              placeholder='Ingrese su contraseña...'
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry
              value={password}
              onChangeText={(value) => onChange(value, "password")}
              onSubmitEditing={handleLogin}
            />

            {/* Login Button */}
            <View style={loginStyles.buttonContainer}>
              <Button
                title='Ingresar'
                color={globalColors.primary}
                onPress={handleLogin}
              />
            </View>

            {/* New Account */}
            <View style={loginStyles.newUserContainer}>
              <Text>¿Aún no tienes una cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("RegisterScreen")}
              >
                <Text
                  style={{ color: globalColors.primary, fontWeight: "bold" }}
                >
                  {" "}
                  Registrarme
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
