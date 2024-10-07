import Inputs from "./Inputs";
import { useState, useContext, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./inputName.css";
import { ExerciseNames } from "../../compartidos/memoria/ExerciseProvider";
import {
  exerciseProps,
  getInputValues,
  changeEvent,
  series,
} from "../../../interfaces";
import Modal from "../../compartidos/modal/ModalExercise/Modal";

function InputName({ index, getInputValues }: getInputValues) {
  const [series, setSeries] = useState<series[]>([
    {
      peso: 0,
      reps: 0,
      rir: 0,
      recu: 0,
    },
  ]);
  const context = useContext(ExerciseNames);
  const ExerciseData = context?.estado;
  const [filterExerciseData, setFilterExerciseData] = useState(ExerciseData || []);
  const [exerciseList, setExerciseList] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [exerciseId, setExerciseId] = useState<number>(0);
  const [showModal, setShowModal] = useState<string>("");

  // carga de información del usuario
  const getSeriesInfo = (
    seriesIndex: number,
    prop: keyof series,
    value: number
  ) => {
    setSeries((prev) => {
      const newSeries = [...prev];
      newSeries[seriesIndex] = { ...newSeries[seriesIndex], [prop]: value };
      return newSeries;
    });
  };

  useEffect(() => {
    getInputValues(index, exerciseId, series);
  }, [inputValue, series]);

  // Estado inicial de los lineas de inputs, declarado después de la función getSeriesInfo
  const [inputLines, setInputLines] = useState([
    [
      <Inputs
        key={0}
        index={0}
        series={series}
        getSeriesInfo={getSeriesInfo}
      />,
    ],
  ]);
  // addInputLine, se encarga de agregar inputs al para un ejercicio mas y la lista que se enviara al contenedor padre
  const addInputLine = () => {
    setInputLines([
      ...inputLines,
      [
        <Inputs
          key={inputLines.length}
          index={inputLines.length}
          series={series}
          getSeriesInfo={getSeriesInfo}
        />,
      ],
    ]);
    setSeries([...series, { peso: 0, reps: 0, rir: 0, recu: 0 }]);
  };

  // removeInputLine, remueve inputs de ejercicio.
  const removeInputLine = () => {
    if (inputLines.length > 1) {
      setInputLines(inputLines.slice(0, -1));
      setSeries(series.slice(0, -1));
    }
  };

  // Abre o cierra el menu con las diferentes opciones de ejercicios
  function exerciseOptions(action: string) {
    setExerciseList(action);
  }

  // Encargada de filtrar y rederizar el ejercicio buscado
  function getInputValue(e: changeEvent, list: exerciseProps[]) {
    setInputValue(e.target.value);
    const lowerCaseInput = e.target.value.toLowerCase();
    const matches = list.filter((item) =>
      item.nombre.toLowerCase().includes(lowerCaseInput)
    );
    setFilterExerciseData(matches);
  }

  return (
    <>
      <Modal modalState={showModal} setShowModal={setShowModal} name={inputValue} />
      <label className="exercise_name">
        <input
          type="text"
          placeholder="Nombre de ejercicio..."
          value={inputValue}
          onChange={(e) => {
            getInputValue(e, ExerciseData || []), exerciseOptions("display");
          }}
        />
        <button className="history_display" onClick={() => setShowModal('open_modal')}>
          <i className="bi bi-clipboard-data-fill"></i>
        </button>
        <div className={`exercise_list ${exerciseList}`}>
          {/* Regresa lista de ejercicios traída del BE */}
          {filterExerciseData.map((item) => (
            <p
              key={item.id}
              onClick={() => {
                exerciseOptions(""),
                  setInputValue(item.nombre),
                  setExerciseId(item.id);
              }}
            >
              {item.nombre}
            </p>
          ))}
        </div>
      </label>
      <div className="titles">
        <p>PESO</p>
        <p>REPS</p>
        <p>RIR</p>
        <p>REC</p>
      </div>
      <label className="results_container">
        <button className="nueva_rutina_btn">
          <i
            className="bi bi-plus-square icon_results"
            onClick={addInputLine}
          ></i>
        </button>
        <button className="remove_line" onClick={() => removeInputLine()}>
          <i className="bi bi-dash-square"></i>
        </button>
        {inputLines.map((input) => input)}
      </label>
    </>
  );
}

export default InputName;