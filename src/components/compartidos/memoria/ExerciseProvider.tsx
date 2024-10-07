import { createContext, useEffect, useReducer } from "react";
import {
  exerciseProps,
  childrenContext,
  ReducerExercise,
  ActionExercise,
} from "../../../interfaces";
import { useAuth } from "./AuthProvider.tsx";
import GetExercise from "../../../servicios/GetExercise.tsx";

export const ExerciseNames = createContext<ReducerExercise | undefined>(
  undefined
);

function ExerciseProvider({ children }: childrenContext) {
  const { GetToken } = useAuth();
  const jwt = GetToken();
  const { data } = GetExercise("ejercicios_list/", jwt);

  const reductor = (
    estado: exerciseProps[],
    action: ActionExercise
  ): exerciseProps[] => {
    switch (action.tipo) {
      case "agregar":
        return [
          ...estado,
          ...(Array.isArray(action.ejercicio)
            ? action.ejercicio
            : [action.ejercicio]),
        ];
      default:
        return estado;
    }
  };

  const initState: exerciseProps[] = [];
  const [estado, enviar] = useReducer(reductor, initState);

  useEffect(() => {
    if (data?.length && data.length > 0 && estado.length === 0) {
      enviar({ tipo: "agregar", ejercicio: data });
    }
  }, [data]);

  return (
    <ExerciseNames.Provider value={{ estado, enviar }}>
      {children}
    </ExerciseNames.Provider>
  );
}

export default ExerciseProvider;
