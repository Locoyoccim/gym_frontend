import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../singin/singin.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../compartidos/memoria/AuthProvider";

interface Props {
  windowChange: (messange: string) => void;
}
interface userData {
  email: string;
  password: string;
}

function SingIn({ windowChange }: Props) {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState<string>("password");
  const [eyeAnimation, setEyeAnitmation] = useState<string>("");
  const [SingInData, SetSingInData] = useState<userData>({
    email: "",
    password: "",
  });

  const changeType = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
    setEyeAnitmation(eyeAnimation === "" ? "animation_in" : "");
  };

  const InputData = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    SetSingInData({ ...SingInData, [field]: e.target.value });
  };

  const SendDataBackEnd = async () => {
    try {
      const response = await fetch(
        "https://gymbackend-production.up.railway.app/rutinas/log-in/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(SingInData),
        }
      );
      if (!response.ok) throw new Error("Error en la solicitud");
      const result = await response.json();
      console.log("Datos enviados Exitosamente", result);
      Login(result.access);
      const id_user = result.id;
      return navigate(`/dashboard/${id_user}`);
    } catch {
      console.error("Error al enviar informacion:", Error);
    }
  };

  return (
    <section id="login_section">
      {/* contenedor para iniciar sesion */}
      <div className="singin_container">
        <div className="img_singin">
          <i className="bi bi-house-heart"></i>
        </div>
        <div className="form_container">
          <form>
            <label htmlFor="email">correo</label>
            <input
              type="email"
              id="email"
              autoComplete="name"
              onChange={(e) => InputData(e, "email")}
            />
            <label htmlFor="password">contraseña</label>
            <input
              type={inputType}
              id="password"
              autoComplete="new-password"
              onChange={(e) => InputData(e, "password")}
            />
            <button
              className={`show_password ${eyeAnimation}`}
              onClick={(e) => changeType(e)}
            >
              <i className="bi bi-eye-fill"></i>
            </button>
          </form>
        </div>
        <div className="singin_buttons">
          <button className="login" onClick={SendDataBackEnd}>
            INICIAR SESION
          </button>
          <button
            className="create_acount_btn"
            onClick={() => windowChange("in")}
          >
            NO TENGO CUENTA
          </button>
        </div>
      </div>
    </section>
  );
}

export default SingIn;
