import "./inputs.css";
import { series, getSeriesInfo, changeEvent } from "../../../interfaces";


function Inputs({index, getSeriesInfo }: getSeriesInfo) {

  const onchange = (e: changeEvent, prop: keyof series) => {
      const value = parseInt(e.target.value, 10);
      getSeriesInfo(index, prop, value)
  }
  

  return (
    <div className="inputs_container">
      <input
        type="number"
        inputMode="numeric"
        placeholder="0"
        onChange={(e) => onchange(e, "peso")}
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="0"
        onChange={(e) => onchange(e, "reps")}
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="0"
        onChange={(e) => onchange(e, "rir")}
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="0"
        onChange={(e) => onchange(e, "recu")}
      />
    </div>
  );
}

export default Inputs;
