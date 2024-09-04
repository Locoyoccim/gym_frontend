import "./modalResults.css";
import ModalP from "./ModalP";

interface Serie {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface props {
  fecha: string;
  series: Serie[];
}
function ModalResult({ fecha, series }: props) {
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
