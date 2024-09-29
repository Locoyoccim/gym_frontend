import { createContext } from "react";
import { exerciseProps, childrenContext } from "../../../interfaces";
import { useAuth } from "./AuthProvider.tsx";
import GetExercise from "../../../servicios/GetExercise.tsx";

export const ExerciseNames = createContext<exerciseProps[]>([]);

function ExerciseProvider({ children }: childrenContext) {
  const { GetToken } = useAuth();
  const jwt = GetToken();
  const { data } = GetExercise("ejercicios_list/", jwt);

  return (
    <ExerciseNames.Provider value={data}>
      {children}
    </ExerciseNames.Provider>
  );
}

export default ExerciseProvider;
