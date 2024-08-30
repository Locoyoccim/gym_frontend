import "bootstrap-icons/font/bootstrap-icons.css";
import "../userInfoForm/userInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

interface dataProps {
  id_user: number;
  actualizacion: string;
  edad: number;
  peso_kg: number;
  estatura: number;
  genero: string;
}

type change = React.ChangeEvent<HTMLInputElement>;

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  return date;
}

function UserInfo() {
  const { id_user } = useParams<{id_user: string}>() 
  const navigate = useNavigate()
  const [userData, setUserData] = useState<dataProps>(
    {
      id_user: id_user ? parseInt(id_user, 10) : 0,
      actualizacion: getCurrentDate(),
      edad: 0,
      peso_kg: 0,
      estatura: 0,
      genero: "m",
    },
  );

  const { edad, peso_kg, estatura, genero } = userData;
  
  // Actualiza la informacion del usuario
  const dataChange = (e: change, field: keyof dataProps) => {
    setUserData({...userData, [field]:e.target.value})
  };

  const SendtoBackEnd = async () =>{
    try {
      const response = await fetch("https://gymbackend-production.up.railway.app/rutinas/newuserinfo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Error en la solicitud");
      const result = await response.json();
      console.log("Datos enviados Exitosamente", result);
      return navigate('/');
    } catch {
      console.error("Error al enviar informacion:", Error);
    }
  }

  return (
    <section id="userInfo_section">
      <div className="secondary_user_container">
        <div id="userInfo_img">
          <i className="bi bi-person-rolodex"></i>
        </div>
        <h1>creando perfil</h1>
        <form action="" id="collect_userinfo">
          <label htmlFor="age">cual es tu edad?</label>
          <input
            type="number"
            id="age"
            inputMode="numeric"
            placeholder={JSON.stringify(edad)}
            onChange={(e) => dataChange(e, "edad")}
          />
          <label htmlFor="height">cual es tu estatura?</label>
          <input
            type="number"
            id="height"
            inputMode="numeric"
            placeholder={JSON.stringify(estatura)}
            onChange={(e) => dataChange(e, "estatura")}
          />
          <label htmlFor="kg">cual es tu peso en kg?</label>
          <input
            type="number"
            id="kg"
            inputMode="numeric"
            placeholder={JSON.stringify(peso_kg)}
            onChange={(e) => dataChange(e, "peso_kg")}
          />
          <label htmlFor="gender">genero ( h / m )?</label>
          <input
            type="text"
            id="gender"
            placeholder={genero}
            onChange={(e) => dataChange(e, "genero")}
          />
        </form>
        <button className="crear" onClick={SendtoBackEnd}>crear</button>
        
      </div>
    </section>
  );
}

export default UserInfo;
