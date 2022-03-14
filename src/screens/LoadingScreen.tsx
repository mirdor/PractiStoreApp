import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color='blue' size={40} />
    </View>
  );
};

export default LoadingScreen;
