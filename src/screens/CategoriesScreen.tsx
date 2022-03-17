import { View, Text, StyleSheet, FlatList, Alert, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "./LoadingScreen";
import { Categoria } from "../types/appTypes";
import ListItem from "../components/ListItem";
import { Input } from "../components/Input";
import { globalColors } from "../theme/loginTheme";
import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";
import { AxiosError } from "axios";

const CategoriesScreen = () => {
  const [newCategory, setNewCategory] = useState("");

  const { categories, isLoading, getCategories, addCategory, deleteCategory } =
    useContext(CategoriesContext);

  const renderItem = (category: Categoria) => {
    return (
      <ListItem
        label={category.nombre}
        onPress={() => {}}
        iconButton={
          <>
            <ListItem.IconButton
              iconName='trash-outline'
              onPress={() => showDeleteDialog(category._id, category.nombre)}
            />
          </>
        }
      />
    );
  };

  const showDeleteDialog = (id: string, nombre: string) => {
    Alert.alert(
      "Aviso",
      `¿Desee eliminar la categoría ${nombre}?`,
      [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: () => {
            deleteCategory(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <View style={styles.newCategory}>
        <Input
          placeholder='Ingrese la nueva categoría...'
          value={newCategory}
          onChangeText={(value) => setNewCategory(value)}
        />
        <Button
          title='Añadir'
          onPress={() => {
            addCategory(newCategory);
          }}
          color={globalColors.primary}
        />
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(c) => c._id}
        ItemSeparatorComponent={() => <View style={styles.itemsSeparator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  newCategory: {
    marginVertical: 10,
  },
  itemsSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
});

export default CategoriesScreen;
