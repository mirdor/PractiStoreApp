import { useEffect, useState } from "react";
import productsApi from "../api/productsApi";
import { Categoria, CategoriesResponse } from "../types/appTypes";

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await productsApi.get<CategoriesResponse>("/categorias");

      setCategories(res.data.categorias);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    categories,
    isLoading,
    setCategories,
    getCategories,
  };
};

export default useCategories;
