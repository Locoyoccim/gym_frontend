import dumbbell from "/fitness_center_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import Calendar_choice from "../../compartidos/calendar/Calendar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../compartidos/memoria/AuthProvider";
import './mainPage.css'

function MainPAge() {
  const { id_user } = useParams<{id_user: string}>()
  const { Logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <section id="main_page">
        <div className="main_img_container">
          <img src={dumbbell} alt="dumbbell" />
        </div>
        <div className="description_container">
          Elige la fecha del entrenamiento que deseas visualizar
        </div>
        <div className="calendar">
        <Calendar_choice/>
        </div>
        <div className="button_navigation">
          <button className="main_btn" > <Link to={`/exercise_history/${id_user}`}>Ir a ver</Link> </button>
          <button className="main_btn"> <Link to={`/NuevaRutina/${id_user}`}>Nuevo Entrenamiento</Link> </button>
          <button className="main_btn" > <Link to={`/profile/${id_user}`}>Mi Perfil</Link> </button>
          <button className="log_out" onClick={() => {Logout(), navigate('/')}}>
              Cerrar Sesión
            </button>
        </div>
      </section>
    </>
  );
}

export default MainPAge;