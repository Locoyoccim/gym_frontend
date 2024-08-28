import { ChangeEvent } from "react";
import "./inputs.css";

interface serieProps {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface getSeriesInfo {
  index: number;
  series: serieProps[];
  getSeriesInfo: (index: number, prop: keyof serieProps, value: number) => void;
}

type ofValue = ChangeEvent<HTMLInputElement>;

function Inputs({index, getSeriesInfo }: getSeriesInfo) {

  const onchange = (e: ofValue, prop: keyof serieProps) => {
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
