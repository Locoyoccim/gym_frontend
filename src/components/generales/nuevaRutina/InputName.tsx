import Inputs from "./Inputs";
import { useState, ChangeEvent, useContext, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./inputName.css";
import { ExerciseNames } from "../../compartidos/memoria/ExerciseProvider";

interface dataProps {
  id: number;
  nombre: string;
}

interface serieProps {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface getInputValues {
  index: number;
  getInputValues: (
    index: number,
    ejercicio: number,
    series: serieProps[]
  ) => void;
}

type ValueOF = ChangeEvent<HTMLInputElement>;

function InputName({ index, getInputValues }: getInputValues) {
  const [series, setSeries] = useState<serieProps[]>([
    {
      peso: 0,
      reps: 0,
      rir: 0,
      recu: 0,
    },
  ]);
  const ExerciseData: dataProps[] = useContext(ExerciseNames);
  const [filterExerciseData, setFilterExerciseData] = useState(ExerciseData);
  const [exerciseList, setExerciseList] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [exerciseId, setExerciseId] = useState<number>(0);

  // carga de informacion del ususario
  const getSeriesInfo = (
    seriesIndex: number,
    prop: keyof serieProps,
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

  // Estado inicial de los lineas de inputs, declarado despues de la funcion getSeriesInfo
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
  // addInputLine, se encarga de agregar inputs al para un ejercicio mas y la lista que se eniara al contenedor padre
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

  // removevInputLine, remueve inputs de ejercicio.
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
  function getInputValue(e: ValueOF, list: dataProps[]) {
    setInputValue(e.target.value);
    const lowerCaseInput = e.target.value.toLowerCase();
    const matches = list.filter((item) =>
      item.nombre.toLowerCase().includes(lowerCaseInput)
    );
    setFilterExerciseData(matches);
  }

  return (
    <>
      <label className="exercise_name">
        <input
          type="text"
          placeholder="Nombre de ejercicio..."
          value={inputValue}
          onChange={(e) => {
            getInputValue(e, ExerciseData), exerciseOptions("display");
          }}
        />
        <div className={`exercise_list ${exerciseList}`}>
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
