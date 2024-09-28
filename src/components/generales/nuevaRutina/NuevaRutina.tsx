import { useContext, useState } from "react";
import "./nuevaRutina.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../compartidos/navbar/Navbar";
import InputExercise from "./InputName";
import Footer from "../footer/Footer";
import ConfirmationModal from "../../compartidos/modal/confitmationModal/ConfirmationModal.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { series, CompleteSerie } from "../../../interfaces/index.tsx";
import axios from "axios";
import { Api_Url } from "../../../servicios/config.ts";
import useToken from "../../hooks/useToken.tsx";
import { SerieContext } from "../../compartidos/memoria/SeriesContext.tsx";

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
  const [userExercise, setUserExercise] = useState<CompleteSerie[]>([]);
  const navigate = useNavigate();
  const userSeries = useContext(SerieContext);
  const { id_user } = useParams();
  const UserId: number = id_user ? parseInt(id_user, 10) : 0;
  const [modalConfirmation, setModalConfirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getToken } = useToken();

  // trae la información de los componentes hijos
  const getInputValues = (
    index: number,
    ejercicio: number,
    series: series[]
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

  // agrega o quita input, según el usuario lo requiera
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
        {
          ejercicio: 0,
          series: [],
          fecha: getCurrentDate(),
          usuario_id: UserId,
        },
      ]);
    } else if (action === "remove") {
      setInputExercise(inputExercise.slice(0, -1));
      setUserExercise(userExercise.slice(0, -1));
    }
  };

  // Envía datos al Backend
  const sendToBackend = async () => {
    setIsLoading(true);
    axios
      .post(`${Api_Url}/series`, userExercise, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("Datos enviados Exitosamente", resp.data);
        userSeries?.enviar({ tipo: "agregar", value: resp.data});
        navigate(`/dashboard/${id_user}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ConfirmationModal
        ModalTittle="gran entrenamiento"
        ModalMsj="ahora solo envía tu rutina, disfruta el descanso y recuperación"
        ConfirmationMsj="Enviar"
        ReturnMsj="regresar"
        sendToBackend={sendToBackend}
        ModalState={modalConfirmation}
        setModalConfirmation={setModalConfirmation}
        isLoading={isLoading}
      />
      <Navbar />
      <section id="nueva_rutina">
        <button
          className="nueva_rutina_btn"
          onClick={() => addInputExercise("add")}
        ></button>
        {/* se rederizar los inputs, inicial de 1 */}
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
      <Footer setModalConfirmation={setModalConfirmation} />
    </>
  );
}

export default NuevaRutina;
