import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Button,
  Keyboard,
  Alert,
} from "react-native";
import MainLogo from "../components/MainLogo";
import useForm from "../hooks/useForm";
import { RootStackParams } from "../navigation/StackNavigator";
import { globalColors, loginStyles } from "../theme/loginTheme";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input/index";

type Props = NativeStackScreenProps<RootStackParams, "RegisterScreen">;

const RegisterScreen = ({ navigation }: Props) => {
  const { email, password, name, onChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    if (!errorMessage.length) return;

    Alert.alert("Registro incorrecto", errorMessage, [
      { text: "Ok", onPress: removeError },
    ]);
  }, [errorMessage]);

  const handleRegister = () => {
    console.log({ name, email, password });
    Keyboard.dismiss();
    signUp({
      nombre: name.trim(),
      correo: email.trim(),
      password: password.trim(),
    });
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

          <View style={{ ...loginStyles.container, height: 550 }}>
            <Text style={loginStyles.title}>Regístrate</Text>

            <Input
              label='Nombre'
              placeholder='Ingrese su nombre...'
              onChangeText={(value) => onChange(value, "name")}
              onSubmitEditing={handleRegister}
              value={name}
              autoCapitalize='words'
              autoCorrect={false}
            />

            <Input
              label='Email'
              placeholder='Ingrese su email...'
              onChangeText={(value) => onChange(value, "email")}
              onSubmitEditing={handleRegister}
              value={email}
              autoCapitalize='none'
              autoCorrect={false}
            />

            <Input
              label='Contraseña'
              placeholder='Ingrese su contraseña...'
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry
              value={password}
              onChangeText={(value) => onChange(value, "password")}
              onSubmitEditing={handleRegister}
            />

            {/* Login Button */}
            <View style={loginStyles.buttonContainer}>
              <Button
                title='Registrarme'
                color={globalColors.primary}
                onPress={handleRegister}
              />
            </View>

            {/* New Account */}
            <View style={loginStyles.newUserContainer}>
              <Text>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text
                  style={{ color: globalColors.primary, fontWeight: "bold" }}
                >
                  {" "}
                  Ingresar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
