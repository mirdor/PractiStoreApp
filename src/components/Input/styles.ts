import { StyleSheet } from "react-native";
import { globalColors } from "../../theme/loginTheme";

export const styles = StyleSheet.create({
  label: {
    marginTop: 25,
    color: globalColors.text,
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
});
