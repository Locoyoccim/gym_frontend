import "./modal.css";
import { ExerciseNames } from "../memoria/ExerciseProvider";
import { SerieContext } from "../memoria/SeriesContext";
import { ChangeEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ModalResult from "./ModalResults";

interface dataProps {
  id: number;
  nombre: string;
}
interface ModalProps {
  modalState: string;
  setShowModal: (e: string) => void;
}

interface Serie {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface Ejercicio {
  name: string;
  series: Serie[];
  fecha: string;
  usuario_id: number;
}

type ValueOF = ChangeEvent<HTMLInputElement>;

function Modal({ modalState, setShowModal }: ModalProps) {
  const { id_user } = useParams();
  const num_id: number = parseInt(id_user ?? "", 10);
  // Manejo del nombre ejercicio
  const ExerciseData: dataProps[] = useContext(ExerciseNames);
  const [inputValue, setInputValue] = useState<string>();
  const [filterData, setFilterData] = useState<dataProps[]>(ExerciseData);
  const [showOptions, setShowOptions] = useState<string>("");

  // Data de las series de acuerdo al nombre del ejercicio
  const seriesData: Ejercicio[] = useContext(SerieContext);
  const user_exercise: Ejercicio[] = seriesData.filter(
    (item) => item.usuario_id === num_id
  );
  const exercise_history: Ejercicio[] = user_exercise.filter(
    (item) => item.name === inputValue
  );

  //Busca el nombre del ejercicio de acuerdo a los valores del input
  function getExerciseName(e: ValueOF, list: dataProps[]) {
    setInputValue(e.target.value);
    const lowerCaseInput = e.target.value.toLowerCase();
    const matches = list.filter((item) =>
      item.nombre.toLowerCase().includes(lowerCaseInput)
    );
    setShowOptions(e.target.value === "" ? "" : "show");
    setFilterData(matches);
  }

  return (
    <div id="modal_container" className={`${modalState}`}>
      <button id="close_btn" onClick={() => setShowModal("")}>
        <i className="bi bi-x"></i>
      </button>
      <div className="top">
        <h2>revisa tu ultimo desempeño</h2>
      </div>
      <form action="search" id="search_form">
        <input
          type="text"
          placeholder="ejercicio..."
          className="check_exercise"
          onChange={(e) => getExerciseName(e, ExerciseData)}
          value={inputValue}
          name="exeercice_name"
        />
        <button type="button" id="clear_btn" onClick={(e) => {e.preventDefault() ,setInputValue('')}}>
          <i className="bi bi-x-octagon-fill"></i>
        </button>
      </form>
      <div className={`list ${showOptions}`}>
        {filterData.map((item) => (
          <p
            key={item.id}
            className="show_list"
            onClick={() => {
              setInputValue(item.nombre), setShowOptions("");
            }}
          >
            {item.nombre}
          </p>
        ))}
      </div>
      <section id="search_result">
        <div className="result_tittle">
          <p className="result_fecha">fecha</p>
          <p className="result">peso</p>
          <p className="result">reps</p>
          <p className="result">rir</p>
        </div>
        <div className="result_container">
          {exercise_history.map((item, index) => (
            <ModalResult key={index} fecha={item.fecha} series={item.series} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Modal;
