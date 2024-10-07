import axios from "axios";
import { useContext, useState } from "react";
import { Api_Url } from "./config";
import { ExerciseNames } from "../components/compartidos/memoria/ExerciseProvider";

interface propExercise {
  nombre: string;
}

function usePostExercise() {
  const context = useContext(ExerciseNames);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const userExercise = (EndPoint: string, exerciseName: propExercise) => {
    setIsLoading(true);
    axios
      .post(`${Api_Url}/${EndPoint}`, exerciseName)
      .then((response) => {
        context?.enviar({ tipo: "agregar", ejercicio: response.data });
        console.log(response.data);
        setIsCreated(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsCreated(false);
        }, 3000);
      });
  };

  return { userExercise, isLoading, isCreated };
}

export default usePostExercise;
