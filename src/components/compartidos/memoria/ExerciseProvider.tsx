import { createContext, useState, useEffect } from "react";
import { userProps, childrenContext } from "../../../interfaces";


export const ExerciseNames = createContext<userProps[]>([]);

function ExerciseProvider({ children }: childrenContext) {
  const [FetchData, setFetchData] = useState<userProps[]>([]);
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://gymbackend-production.up.railway.app/rutinas/ejercicios_list/", {
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
