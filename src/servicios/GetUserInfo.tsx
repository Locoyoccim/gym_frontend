import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Url } from "./config";
import { infoUserProps } from "../interfaces";

const GetUserInfo = (Endpoint: string, token: string | null) => {
  const [data, setData] = useState<infoUserProps>({
    nombre: "",
    actualizacion: 0,
    edad: 0,
    peso_kg: 0,
    estatura: 0,
    genero: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${Api_Url}/${Endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default GetUserInfo;
