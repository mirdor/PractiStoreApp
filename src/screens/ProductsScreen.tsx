import React, { useContext, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductsContext } from "../context/ProductsContext";
import { ProductsStackParams } from "../navigation/ProductsStackNavigator";
import { Producto } from "../types/appTypes";
import { globalColors } from "../theme/loginTheme";
import Fab from "../components/Fab";

type Props = NativeStackScreenProps<ProductsStackParams, "ProductsScreen">;

const ProductsScreen = ({ navigation }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { products, loadProducts } = useContext(ProductsContext);

  const renderItem = (item: Producto) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.productButton}
        onPress={() =>
          navigation.navigate("ProductScreen", {
            id: item._id,
            name: item.nombre,
          })
        }
      >
        <Text style={styles.productName} numberOfLines={1}>
          {item.nombre}
        </Text>
      </TouchableOpacity>
    );
  };

  const onRefresh = async () => {
    setIsRefreshing(true);

    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <FlatList
          data={products}
          keyExtractor={(p) => p._id}
          renderItem={({ item }) => renderItem(item)}
          ItemSeparatorComponent={() => <View style={styles.itemsSeparator} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressBackgroundColor='white'
              colors={[globalColors.primary]}
            />
          }
        />
      </View>
      <Fab
        iconName='add-outline'
        onPress={() => navigation.navigate("ProductScreen", {})}
      />
    </>
  );
};

const styles = StyleSheet.create({
  productButton: {
    paddingHorizontal: 5,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
  },
  itemsSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
});

export default ProductsScreen;
