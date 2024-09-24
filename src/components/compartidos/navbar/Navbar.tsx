import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import navImg from "/muscle-arm-svgrepo-com.svg";
import { useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../memoria/AuthProvider";
import Cronometro from "../stopwatch/Cronometro";

function Navbar() {
  const [navState, setNavState] = useState("");
  const { id_user } = useParams();
  const { Logout } = useAuth();
  const location = useLocation()
  const navigate = useNavigate();

  const navButton = (newState: string) => {
    setNavState(newState);
  };

  return (
    <div className="navbar_container">
      <button>
        <img src={navImg} alt="nav_img" />
      </button>
      <div className="rutinaTime">
        {location.pathname === `/NuevaRutina/${id_user}` ? <Cronometro /> : '' }
      </div>
      <button className="hamburguer_btn" onClick={() => navButton("open")}>
        <i className="bi bi-list"></i>
      </button>
      <nav className={`nav ${navState}`}>
        <ul>
          <button className="close_btn" onClick={() => navButton("")}>
            <i className="bi bi-x-circle"></i>
          </button>
          <li>
            <Link to={`/dashboard/${id_user}`}>Inicio</Link>
          </li>
          <li>
            <Link to={`/profile/${id_user}`}> Mi Perfil</Link>
          </li>
          <li>
            <button className="log_out" onClick={() => {Logout(), navigate("/")}}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
