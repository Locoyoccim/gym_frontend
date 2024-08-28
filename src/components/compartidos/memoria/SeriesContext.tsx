import { createContext, ReactNode, useState, useEffect } from "react";

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
  const jwt = localStorage.getItem('token')

  useEffect(() => {
    fetch("http://127.0.0.1:8000/rutinas/series/", {
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
  }, []);

  return (
    <>
      <SerieContext.Provider value={FetchData}>
        {children}
      </SerieContext.Provider>
    </>
  );
}

export default SeriesContext;
