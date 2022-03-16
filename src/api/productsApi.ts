import axios, { Method } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "https://rncafe-app-backend.herokuapp.com/api";

const productsApi = axios.create({
  baseURL,
});

productsApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers!["x-token"] = token;
  }

  return config;
});

export const productsFetch = async (
  endPoint: string,
  method: Method,
  contentType: string,
  data: any
) => {
  const token = await AsyncStorage.getItem("token");

  return fetch(`${baseURL}/${endPoint}`, {
    method,
    headers: {
      "Content-Type": contentType,
      Accept: "application/json",
      "x-token": token || "",
    },
    body: data,
  });
};

export default productsApi;
