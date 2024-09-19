import './resultDisplayer.css'
import { series } from '../../../interfaces'

function Result_Displayer({peso, recu, reps, rir} : series) {
 
  return (
    <div className="results">
      <p>{peso}</p>
      <p>{reps}</p>
      <p>{rir}</p>
      <p>{recu}</p>
    </div>
  );
}

export default Result_Displayer;
