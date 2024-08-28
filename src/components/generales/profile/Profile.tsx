import "/src/components/generales/profile/profile.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../compartidos/navbar/Navbar";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DataProps{
  nombre: string,
  actualizacion: ReactNode,
  edad: number,
  peso_kg: number,
  estatura: number,
  genero: string
}

function Profile() {
  const [userData, setUserData] = useState<DataProps>({
    nombre: '',
    actualizacion: 0,
    edad: 0,
    peso_kg: 0,
    estatura: 0,
    genero: ""
  });
  const { id_user } = useParams();

  const getFetchData = async () => {
    try {
      const jwt = localStorage.getItem('token')
      const response = await fetch(
        `http://127.0.0.1:8000/rutinas/userinfo/${id_user}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            },
        }
      );
      if (!response.ok)
        throw new Error("Error en la solicitud: " + response.status);
      const Data = await response.json();
      setUserData(Data);
    } catch (error) {
      console.error("Fetching error", error);
      return null;
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile_container">
        <div className="profile_img_container">
          <i className="bi bi-person-circle"></i>
          <h3>{userData.nombre}</h3>
        </div>
        <div className="user_data">
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
            <span>{userData.genero === 'm' ? 'mujer' : 'hombre'}</span>
          </div>
          <div className="data">
            <p>actualizado</p>
            <span>{userData.actualizacion}</span>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default Profile;
