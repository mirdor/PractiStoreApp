import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { globalColors } from "../../theme/loginTheme";

type Props = {
  onPress: () => void;
  label: string;
  iconButton?: React.ReactNode;
};

const ListItem = ({ onPress, label, iconButton }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.listItem}
      onPress={onPress}
    >
      <Text style={styles.listLabel} numberOfLines={1}>
        {label}
      </Text>
      <View style={styles.iconButtonContainer}>{iconButton}</View>
    </TouchableOpacity>
  );
};

type IconButtonProps = {
  iconName: string;
  onPress: () => void;
};

const IconButton = ({ iconName, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={{ marginLeft: 10, paddingHorizontal: 5 }}
      onPress={onPress}
    >
      <Ionicons
        name={iconName as any}
        color={globalColors.secondary}
        size={24}
      />
    </TouchableOpacity>
  );
};

ListItem.IconButton = IconButton;

export default ListItem;
