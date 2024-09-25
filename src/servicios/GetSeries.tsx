import { useEffect, useState } from "react";
import { CompleteSerie } from "../interfaces";
import { Api_Url } from "./config";
import axios from "axios";

const GetSeries = (Endpoint: string, token: string) => {
  const [data, setData] = useState<CompleteSerie[]>([]);
  const [error, setError] = useState<string>();

  const getFetch = (Endpoint: string, token: string) => {
    axios
      .get(`${Api_Url}/${Endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    getFetch(Endpoint, token);
  }, []);

  return { data, error, getFetch };
};

export default GetSeries;
