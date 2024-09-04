import './modalP.css'

interface Serie {
    peso: number;
    reps: number;
    rir: number;
}

function ModalP({peso, reps, rir}: Serie) {
  return (
    <section id="result_displyer">
      <p className="result">{peso}</p>
      <p className="result">{reps}</p>
      <p className="result">{rir}</p>
    </section>
  );
}

export default ModalP;
