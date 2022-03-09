import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigation/ProductsStackNavigator';
import { globalColors } from '../theme/loginTheme';
import useCategories from '../hooks/useCategories';
import useForm from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

type Props = NativeStackScreenProps<ProductsStackParams, 'ProductScreen'>;

const ProductScreen = ({ navigation, route }: Props) => {
  const { id = '', name = '' } = route.params;

  const { categories, isLoading } = useCategories();

  const { _id, categoriaId, nombre, img, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  const { loadProductById, addProduct, updateProduct } = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name || 'Nuevo Producto',
    });
  }, []);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;

      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
    Alert.alert(
      'Registro exitoso',
      'Si aún no añade una imagen, puede realizarlo con los botones en la parte inferior',
      [{ text: 'Cerrar' }],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          {img.length > 0 ? (
            <Image source={{ uri: img }} style={{ width: '100%', height: 250, borderRadius: 10 }} />
          ) : (
            <Text>El producto aún no tiene imagen D:</Text>
          )}
        </View>
        <Text style={styles.label}>Nombre del producto: </Text>
        <TextInput
          placeholder="Producto..."
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />

        <Text style={styles.label}>Categoría: </Text>
        {!isLoading ? (
          <Picker
            selectedValue={categoriaId}
            onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
            {categories.map(category => (
              <Picker.Item key={category._id} label={category.nombre} value={category._id} />
            ))}
          </Picker>
        ) : (
          <ActivityIndicator style={{ marginVertical: 8 }} color={globalColors.primary} size={30} />
        )}
        <Button title="Guardar" onPress={saveOrUpdate} color={globalColors.primary} />

        {_id.length > 0 && (
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={{ paddingHorizontal: 20, paddingVertical: 15 }}
              onPress={() => {}}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 20, paddingVertical: 15 }}
              onPress={() => {}}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Galería</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  imgContainer: {
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 30,
    elevation: 10,
  },
  label: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: globalColors.secondary,
    height: 45,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: globalColors.primary,
  },
});

export default ProductScreen;
