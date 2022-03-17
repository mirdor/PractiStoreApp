import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import AuthProvider from "./src/context/AuthContext";
import ProductsProvider from "./src/context/ProductsContext";
import CategoriesProvider from "./src/context/CategoriesContext";

const AppState = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
}
