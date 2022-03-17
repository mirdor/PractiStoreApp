import { StyleSheet } from "react-native";
import { globalColors } from "../../theme/loginTheme";

export const styles = StyleSheet.create({
  labelLogin: {
    marginTop: 25,
    color: globalColors.text,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
  inputField: {
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  inputFieldIOS: {
    borderBottomColor: globalColors.primary,
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  textInput: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: globalColors.secondary,
    height: 45,
    marginTop: 10,
    marginBottom: 15,
  },
});
