import { createContext, ReactNode, useState, useEffect } from "react";

interface dataProps {
  id: number;
  nombre: string;
}

type children = {
  children: ReactNode;
};

export const ExerciseNames = createContext<dataProps[]>([]);

function ExerciseProvider({ children }: children) {
  const [FetchData, setFetchData] = useState<dataProps[]>([]);
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/rutinas/ejercicios_list/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        setFetchData(data);
      })
      .catch((error) => console.error("Error:", error)); // Maneja errores
  }, []);

  return (
    <ExerciseNames.Provider value={FetchData}>
      {children}
    </ExerciseNames.Provider>
  );
}

export default ExerciseProvider;
