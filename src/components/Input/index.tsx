import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import React from "react";
import { globalColors } from "../../theme/loginTheme";
import { styles } from "./styles";

type LoginProps = {
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoCorrect?: boolean;
  onChangeText: (value: string) => void;
  value: string;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  secureTextEntry?: boolean;
};

export const LoginInput = (props: LoginProps) => {
  const {
    label,
    placeholder,
    keyboardType = "default",
    autoCapitalize = "none",
    autoCorrect = true,
    onChangeText,
    value,
    onSubmitEditing,
    secureTextEntry = false,
  } = props;

  return (
    <>
      <Text style={styles.labelLogin}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='#999'
        underlineColorAndroid={globalColors.primary}
        keyboardType={keyboardType}
        style={Platform.OS === "ios" ? styles.inputFieldIOS : styles.inputField}
        selectionColor={globalColors.secondary}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

type Props = {
  label?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  onChangeText: (value: string) => void;
  value: string;
};

export const Input = (props: Props) => {
  const {
    label,
    placeholder,
    keyboardType = "default",
    autoCapitalize = "none",
    onChangeText,
    value,
  } = props;

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.textInput}
        selectionColor={globalColors.secondary}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        value={value}
      />
    </>
  );
};
