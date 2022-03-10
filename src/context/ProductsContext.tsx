import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import productsApi, { cafeFetch } from '../api/productsApi';
import { ImagePickerResponse } from 'react-native-image-picker';
import { AxiosError } from 'axios';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: ImagePickerResponse, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await productsApi.get<ProductsResponse>('/productos?limite=50');

    setProducts([...res.data.productos]);
  };
  const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
    const res = await productsApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });

    setProducts([...products, res.data]);

    return res.data;
  };
  const updateProduct = async (categoryId: string, productName: string, productId: string) => {
    const res = await productsApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });

    setProducts(
      products.map(product => {
        return product._id === productId ? res.data : product;
      }),
    );
  };
  const deleteProduct = async (id: string) => {};
  const loadProductById = async (id: string): Promise<Producto> => {
    const res = await productsApi.get<Producto>(`/productos/${id}`);

    return res.data;
  };
  const uploadImage = async ({ assets }: ImagePickerResponse, id: string) => {
    if (!assets) return;
    const fileToUpload = {
      uri: assets[0].uri,
      type: assets[0].type,
      name: assets[0].fileName,
    };

    console.log(fileToUpload);

    const formData = new FormData();

    formData.append('archivo', fileToUpload);

    try {
      const res = await cafeFetch(
        `uploads/productos/${id}`,
        'PUT',
        'multipart/form-data',
        formData,
      );

      console.log(res);
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
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
