import React from "react";
import { Image, View } from "react-native";

const MainLogo = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 150, width: 260 }}
      />
    </View>
  );
};

export default MainLogo;
