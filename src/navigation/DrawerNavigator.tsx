import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Button, useWindowDimensions, View } from "react-native";
import ProductsStackNavigator from "./ProductsStackNavigator";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { styles } from "../theme/drawerTheme";
import { Ionicons } from "@expo/vector-icons";
import { globalColors } from "../theme/loginTheme";
import CategoriesScreen from "../screens/CategoriesScreen";

type RootDrawerParams = {
  ProductsNavigator: undefined;
  CategoriesScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

const DrawerNavigator = () => {
  const { width } = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: width >= 400 ? "permanent" : "front",
        headerShown: false,
        drawerStyle: { width: 240 },
      }}
      drawerContent={InnerMenu}
    >
      <Drawer.Screen
        name='ProductsNavigator'
        component={ProductsStackNavigator}
      />
      <Drawer.Screen name='CategoriesScreen' component={CategoriesScreen} />
    </Drawer.Navigator>
  );
};

const InnerMenu = ({ navigation }: DrawerContentComponentProps) => {
  const { logOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView>
      <Avatar />
      <DrawerItem
        label='Productos'
        onPress={() => navigation.navigate("ProductsNavigator")}
        icon={({ size }) => (
          <Ionicons
            name='download-outline'
            color={globalColors.darkGray}
            size={size}
            style={{ position: "absolute", left: 8 }}
          />
        )}
        labelStyle={styles.menuItemText}
        activeBackgroundColor='#545344'
      />
      <DrawerItem
        label='Categorías'
        onPress={() => navigation.navigate("CategoriesScreen")}
        icon={({ size }) => (
          <Ionicons
            name='file-tray-stacked-outline'
            color={globalColors.darkGray}
            size={size}
            style={{ position: "absolute", left: 8 }}
          />
        )}
        labelStyle={styles.menuItemText}
      />
      <View style={{ flex: 1 }} />
      <View style={styles.menuContainer}>
        <Button
          title='Cerrar Sesión'
          onPress={logOut}
          color={globalColors.blackBg}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerNavigator;
