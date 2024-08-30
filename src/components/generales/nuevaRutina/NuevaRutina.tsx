import { useState } from "react";
import "./nuevaRutina.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../compartidos/navbar/Navbar";
import InputExercise from "./InputName";
import Footer from "../footer/Footer";
import Modal from "../../compartidos/modal/Modal";
import { useNavigate, useParams } from "react-router-dom";

interface serieProps {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface exerciseProps {
  ejercicio: number;
  series: serieProps[];
  fecha: string;
  usuario_id: number;
}

//Obtener el dia en curso
const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  return date;
};

function NuevaRutina() {
  const [userExercise, setUserExercise] = useState<exerciseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id_user } = useParams();
  const UserId: number = id_user ? parseInt(id_user, 10) : 0;
  const [showModal, setShowModal] = useState<string>('');

  // trae la informacion de los componentes hijos
  const getInputValues = (
    index: number,
    ejercicio: number,
    series: serieProps[]
  ) => {
    const date = getCurrentDate();

    setUserExercise((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ejercicio,
        series,
        fecha: date,
        usuario_id: UserId,
      };
      return newData;
    });
  };

  // manejo de la cantidad de lineas para inputs de ejercicios
  const [inputExercise, setInputExercise] = useState([
    [<InputExercise key={0} getInputValues={getInputValues} index={0} />],
  ]);

  // agrega o quita input, segun el usuario lo requiera
  const addInputExercise = (action: string) => {
    if (action === "add") {
      setInputExercise([
        ...inputExercise,
        [
          <InputExercise
            key={inputExercise.length}
            getInputValues={getInputValues}
            index={inputExercise.length}
          />,
        ],
      ]);
      setUserExercise([
        ...userExercise,
        { ejercicio: 0, series: [], fecha: getCurrentDate(), usuario_id: UserId },
      ]);
    } else if (action === "remove") {
      setInputExercise(inputExercise.slice(0, -1));
      setUserExercise(userExercise.slice(0, -1));
    }
  };

  // Envia datos al Backend

  const sendToBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://gymbackend-production.up.railway.app//rutinas/series/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userExercise),
      });
      if (!response.ok) {
        throw new Error("Error al enviar su rutina");
      }
      const data = await response.json();
      console.log("Datos enviados Exitosamente", data);
      setLoading(false);
      return navigate(`/dashboard/${id_user}`);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal modalState={showModal} setShowModal={setShowModal}/>
      {loading && (
        <div className="loader_container">
          <div className="loader"></div>
          <p>Guardando Rutina</p>
        </div>
      )}
      <Navbar />
      <section id="nueva_rutina">
        <button
          className="nueva_rutina_btn"
          onClick={() => addInputExercise("add")}
        ></button>
        {/* se rederizan los inputs, inicial de 1 */}
        {inputExercise.map((input) => input)}
        <div className="btn_container">
          <button
            className="nueva_rutina_btn"
            onClick={() => addInputExercise("add")}
          >
            <i className="bi bi-plus-square icon_name"></i>
          </button>
          <button
            className="nueva_rutina_btn minus"
            onClick={() => addInputExercise("remove")}
          >
            <i className="bi bi-dash-square remove_icon"></i>
          </button>
        </div>
      </section>
      <Footer sendToBackend={sendToBackend} setShowModal={setShowModal}/>
    </>
  );
}

export default NuevaRutina;
