import { createContext, ReactNode, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

interface series{
    peso: number;
    reps: number;
    rir: number;
    recu: number;
}

interface CompleteSerie {
    name: string;
    series: series[];
    fecha: string;
    usuario_id: number;
  }

export const SerieContext = createContext<CompleteSerie[]>([]);

type SerieData = {
  children: ReactNode;
};

function SeriesContext({ children }: SerieData) {
  const [FetchData, setFetchData] = useState<CompleteSerie[]>([]);
  const { isAuthenticated } = useAuth();
  const jwt = localStorage.getItem('token')

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
