import './resultDisplayer.css'

interface ResultsInfo{
  peso: number,
  reps: number,
  rir: number,
  recu: number
}

function Result_Displayer({peso, recu, reps, rir} : ResultsInfo) {
 
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
