import { useState } from "react";
import "./ExerciseCard.css";
import Result_Displayer from "./Result_Displayer";

interface SerieProps {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface ExerciseCardProps {
  name: string;
  series: SerieProps[];
  fecha: string;
  usuario_id: number;
}

function ExerciseCard({ name, series }: ExerciseCardProps) {
  const [arrowTurn, SetArrowTurn] = useState("");
  const [cardHeight, SetCardheight] = useState("");

  const openCard = () => {
    cardHeight === "" ? SetCardheight("extend") : SetCardheight("");
  };
  const arrowAnimation = () => {
    arrowTurn === "" ? SetArrowTurn("turn") : SetArrowTurn("");
  };

  return (
    <section
      id="Exercise_display"
      onClick={() => {
        openCard(), arrowAnimation();
      }}
    >
      <div className={`card_results ${cardHeight}`}>
        <div className="tittle_card">
          <h2 className="card_name">{name}</h2>
          <button className={`arrow_btn ${arrowTurn}`}>
            <i className="bi bi-caret-up-fill"></i>
          </button>
        </div>
        <div className="card_results_container">
          <div className="results_details">
            <p>peso</p>
            <p>reps</p>
            <p>rir</p>
            <p>recu</p>
          </div>
          {Array.isArray(series) &&
            series.map((serie, index) => (
              <Result_Displayer
                key={index}
                {...serie}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default ExerciseCard;
