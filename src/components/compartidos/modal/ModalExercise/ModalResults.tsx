import "./modalResults.css";
import ModalP from "./ModalP";
import { fechaSerieProps } from "../../../../interfaces";


function ModalResult({ fecha, series }: fechaSerieProps) {
  return (
    <section id="results_details">
      <p className="fecha">{fecha}</p>
      <div className="results_container">
        {series.map((item, index) => (
          <ModalP key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

export default ModalResult;
