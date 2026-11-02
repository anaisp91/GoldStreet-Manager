import { api } from "./api";

export const testApi = async () => {
  try {
    const response = await api.get("/");
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log("Error en la peticion", error);
  }
};
testApi();
