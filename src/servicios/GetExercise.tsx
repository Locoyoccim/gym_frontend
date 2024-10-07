import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Url } from "./config";
import { exerciseProps } from "../interfaces";

const GetExercise = (Endpoint: string, token: string) => {
  const [data, setData] = useState<exerciseProps[]>([]);
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
  }, [token]);

  return { data, loading, error };
};

export default GetExercise;
