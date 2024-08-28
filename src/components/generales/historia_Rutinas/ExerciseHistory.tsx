import Navbar from "../../compartidos/navbar/Navbar";
import ExerciseCard from "./ExerciseCard";
import { useContext } from "react";
import { ActualDate } from "../../compartidos/memoria/SelectDate";
import { SerieContext } from "../../compartidos/memoria/SeriesContext";
import { useParams } from "react-router-dom";

interface Serie {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}

interface Ejercicio {
  name: string;
  series: Serie[];
  fecha: string;
  usuario_id: number;
}

function ExerciseHistory() {
  const { id_user } = useParams<{ id_user: string }>();
  const userId = id_user !== undefined ? parseInt(id_user, 10) : null;
  const SelectedDate = useContext(ActualDate);
  const userSerie: Ejercicio[] = useContext(SerieContext);
  const SerieFilterUser: Ejercicio[] = userSerie.filter(
    (item) => item.usuario_id === userId
  );
  const DateFilter: Ejercicio[] = SerieFilterUser.filter(
    (item) => item.fecha === SelectedDate?.estado
  );

  return (
    <>
      <section id="exercise_history">
        <Navbar />
        {DateFilter.map((ejercicio, index) => (
          <ExerciseCard key={index} {...ejercicio} />
        ))}
      </section>
    </>
  );
}

export default ExerciseHistory;
