import "/src/components/generales/profile/profile.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../compartidos/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { infoUserProps } from "../../../interfaces";
import useToken from "../../hooks/useToken";
import GetUserInfo from "../../../servicios/GetUserInfo";
import BtnLoder from "../../compartidos/Loader/BtnLoader";

function Profile() {
  const [userData, setUserData] = useState<infoUserProps>({
    nombre: "",
    actualizacion: 0,
    edad: 0,
    peso_kg: 0,
    estatura: 0,
    genero: "",
  });
  const { id_user } = useParams();
  const { getToken } = useToken();
  const jwt = getToken();
  const { data, loading } = GetUserInfo(`userinfo/${id_user}/`, jwt);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="profile_container">
        <div className="profile_img_container">
          <i className="bi bi-person-circle"></i>
          <h3>
            {userData.nombre}
            <button className="btn_edit">
              <Link to={`/userRegistration/${id_user}/`}>
                <i className="bi bi-pencil-square"></i>
              </Link>
            </button>
          </h3>
        </div>
        <div className="user_data">
          {loading ? (
            <BtnLoder />
          ) : (
            <>
              <div className="data">
                <p>EDAD</p>
                <span>{userData.edad} Años</span>
              </div>
              <div className="data">
                <p>ESTATURA</p>
                <span>{userData.estatura} cm</span>
              </div>
              <div className="data">
                <p>PESO</p>
                <span>{userData.peso_kg} kg</span>
              </div>
              <div className="data">
                <p>GENERO</p>
                <span>{userData.genero === "m" ? "mujer" : "hombre"}</span>
              </div>
              <div className="data">
                <p>actualizado</p>
                <span>{userData.actualizacion}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
