import React, { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from "../types/appTypes";
import productsApi, { productsFetch } from "../api/productsApi";
import { ImageInfo } from "expo-image-picker";

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (
    categoryId: string,
    productName: string,
    price: number
  ) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
    price: number
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<Producto>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: ImageInfo, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await productsApi.get<ProductsResponse>("/productos?limite=50");

    setProducts([...res.data.productos]);
  };
  const addProduct = async (
    categoryId: string,
    productName: string,
    price: number
  ): Promise<Producto> => {
    const res = await productsApi.post<Producto>("/productos", {
      nombre: productName,
      categoria: categoryId,
      precio: price,
    });

    setProducts([...products, res.data]);

    return res.data;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
    price: number
  ) => {
    const res = await productsApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
      precio: price,
    });

    setProducts(
      products.map((product) => {
        return product._id === productId ? res.data : product;
      })
    );
  };
  const deleteProduct = async (id: string): Promise<Producto> => {
    const res = await productsApi.delete<Producto>(`/productos/${id}`);
    setProducts([...products.filter((product) => product._id !== id)]);
    return res.data;
  };
  const loadProductById = async (id: string): Promise<Producto> => {
    const res = await productsApi.get<Producto>(`/productos/${id}`);

    return res.data;
  };
  const uploadImage = async ({ uri }: ImageInfo, id: string) => {
    const fileName = uri.split("/").pop();
    const fileToUpload = {
      uri,
      type: "image/jpg",
      name: fileName,
    };
    const formData = new FormData();
    formData.append("archivo", fileToUpload as any);
    try {
      const res = await productsFetch(
        `uploads/productos/${id}`,
        "PUT",
        "multipart/form-data",
        formData
      );

      console.log(JSON.stringify(res, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
