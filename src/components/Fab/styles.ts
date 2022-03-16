import { StyleSheet } from "react-native";
import { globalColors } from "../../theme/loginTheme";

export const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    backgroundColor: globalColors.secondary,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    elevation: 4,
  },
});
