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
    signUp({ nombre: name, correo: email, password });
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

            <Text style={loginStyles.label}>Nombre</Text>
            <TextInput
              placeholder='Ingrese su nombre...'
              placeholderTextColor='#999'
              underlineColorAndroid={globalColors.primary}
              style={
                Platform.OS === "ios"
                  ? loginStyles.inputFieldIOS
                  : loginStyles.inputField
              }
              selectionColor={globalColors.secondary}
              autoCapitalize='words'
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "name")}
              value={name}
              onSubmitEditing={handleRegister}
            />

            <Text style={loginStyles.label}>Email</Text>
            <TextInput
              placeholder='Ingrese su email...'
              placeholderTextColor='#999'
              underlineColorAndroid={globalColors.primary}
              keyboardType='email-address'
              style={
                Platform.OS === "ios"
                  ? loginStyles.inputFieldIOS
                  : loginStyles.inputField
              }
              selectionColor={globalColors.secondary}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "email")}
              value={email}
              onSubmitEditing={handleRegister}
            />

            <Text style={loginStyles.label}>Contraseña</Text>
            <TextInput
              placeholder='Ingrese su contraseña'
              placeholderTextColor='#999'
              secureTextEntry
              underlineColorAndroid={globalColors.primary}
              style={
                Platform.OS === "ios"
                  ? loginStyles.inputFieldIOS
                  : loginStyles.inputField
              }
              selectionColor={globalColors.secondary}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(value) => onChange(value, "password")}
              value={password}
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
