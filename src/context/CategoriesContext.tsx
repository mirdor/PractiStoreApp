import React, { createContext, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Categoria, CategoriesResponse } from "../types/appTypes";
import useCategories from "../hooks/useCategories";
import productsApi from "../api/productsApi";

type CategoriesContextProps = {
  categories: Categoria[];
  getCategories: () => void;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  isLoading: boolean;
};

export const CategoriesContext = createContext({} as CategoriesContextProps);

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const { categories, setCategories, isLoading, getCategories } =
    useCategories();

  const addCategory = async (name: string) => {
    try {
      const res = await productsApi.post<Categoria>("/categorias", {
        nombre: name,
      });
      setCategories([res.data, ...categories]);
    } catch (error: any) {
      Alert.alert("Error", error.response.data.msg, [{ text: "Aceptar" }]);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await productsApi.delete(`/categorias/${id}`);
      setCategories([...categories.filter((cat) => cat._id !== id)]);
      console.log(res);
    } catch (error: any) {
      console.log(error, error.msg);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        isLoading,
        getCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
