import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import productsApi from '../api/productsApi';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
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
  const uploadImage = async (data: any, id: string) => {};

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
