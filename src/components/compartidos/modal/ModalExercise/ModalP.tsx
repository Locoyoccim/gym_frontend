import './modalP.css'
import { series } from '../../../../interfaces';


function ModalP({peso, reps, rir}: series) {
  return (
    <section id="result_displyer">
      <p className="result">{peso}</p>
      <p className="result">{reps}</p>
      <p className="result">{rir}</p>
    </section>
  );
}

export default ModalP;
