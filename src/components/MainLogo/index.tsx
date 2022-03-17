import React from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";

const MainLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logoFull.png")} style={styles.img} />
    </View>
  );
};

export default MainLogo;
