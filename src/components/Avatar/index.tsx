import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles";

type Props = {
  uri?: string;
};

const Avatar = ({ uri }: Props) => {
  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={styles.avatar} />
      ) : (
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
      )}
    </View>
  );
};

export default Avatar;
