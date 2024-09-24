import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { CompleteSerie, childrenContext } from "../../../interfaces";

export const SerieContext = createContext<CompleteSerie[]>([]);


function SeriesContext({ children }: childrenContext) {
  const [FetchData, setFetchData] = useState<CompleteSerie[]>([]);
  const { isAuthenticated, GetToken } = useAuth();
  const jwt = GetToken()

  useEffect(() => {
    fetch("https://gymbackend-production.up.railway.app/rutinas/series/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    })
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        setFetchData(data);
      })
      .catch((error) => console.error("Error:", error)); // Maneja errores
  }, [isAuthenticated]);

  return (
    <>
      <SerieContext.Provider value={FetchData}>
        {children}
      </SerieContext.Provider>
    </>
  );
}

export default SeriesContext;
