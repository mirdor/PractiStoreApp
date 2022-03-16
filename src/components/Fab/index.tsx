import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = {
  iconName: string;
  onPress: () => void;
};

const Fab = ({ iconName, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName as any} size={35} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default Fab;
