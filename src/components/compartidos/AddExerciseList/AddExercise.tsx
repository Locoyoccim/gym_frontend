import { useState } from "react";
import "./addExercise.css";
import { changeEvent } from "../../../interfaces";
import BtnLoader from "../Loader/BtnLoader";
import usePostExercise from "../../../servicios/PostExercise";
import Notification from "../NotificationResponse/Notification";

interface propExercise {
  nombre: string;
}

function AddExercise() {
  const [newExercise, setNewExercise] = useState<propExercise>({ nombre: "" });
  const { userExercise, isLoading, isCreated } = usePostExercise();

  const handleChange = (e: changeEvent) => {
    setNewExercise({ nombre: e.target.value.trim() });
  };

  const sendToBackend = () => {
    userExercise("ejercicios_list/", newExercise);
  };

  return (
    <div id="formAddExercise">
      <i className="bi bi-cloud-plus-fill"></i>
      <label htmlFor="exerciseName">
        Agregar Ejercicio:
        <input
          type="text"
          id="exerciseName"
          name="exerciseName"
          placeholder="Nombre del ejercicio:"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button onClick={sendToBackend}>
        {isLoading ? <BtnLoader /> : "enviar"}
      </button>
      <Notification tittle={"Ejercicio Creado"} isOpen={isCreated}/>
    </div>
  );
}

export default AddExercise;
