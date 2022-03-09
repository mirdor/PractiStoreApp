import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../navigation/ProductsStackNavigator';
import { Producto } from '../interfaces/appInterfaces';
import { globalColors } from '../theme/loginTheme';

type Props = NativeStackScreenProps<ProductsStackParams, 'ProductsScreen'>;

const ProductsScreen = ({ navigation }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { products, loadProducts } = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem = (item: Producto) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.productButton}
        onPress={() => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}>
        <Text style={styles.productName}>{item.nombre}</Text>
      </TouchableOpacity>
    );
  };

  const onRefresh = async () => {
    setIsRefreshing(true);

    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={styles.itemsSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            progressViewOffset={50}
            progressBackgroundColor={globalColors.primary}
            colors={[globalColors.text]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productButton: {
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  productName: {
    fontSize: 18,
  },
  itemsSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});

export default ProductsScreen;
