import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../singin/singin.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "../../compartidos/memoria/AuthProvider";
import BtnLoader from "../../compartidos/Loader/BtnLoader";
import InputEye from "../../compartidos/inputEye/InputEye";
import { userLogIn } from "../../../interfaces";

interface Props {
  windowChange: (message: string) => void;
}

function SingIn({ windowChange }: Props) {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const [Loader, setLoader] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const [SingInData, SetSingInData] = useState<userLogIn>({
    email: "",
    password: "",
  });

  const changeType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const InputData = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    SetSingInData({ ...SingInData, [field]: e.target.value });
  };

  const SendDataBackEnd = async () => {
    try {
      setLoader(true);
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
      console.error("Error al enviar información:", Error);
      setLoader(false);
    }
  };

  return (
    <section id="login_section">
      {/* contenedor para iniciar sesión */}
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
              name="email"
              aria-required="true"
              aria-label="Correo electrónico"
              required
            />
            <label htmlFor="password">contraseña</label>
            <input
              type={inputType}
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => InputData(e, "password")}
              aria-required="true"
              aria-label="Contraseña"
              required
            />
            <InputEye operation={changeType} />
          </form>
        </div>
        <div className="singin_buttons">
          <button
            className={`login ${
              SingInData.email !== "" && SingInData.password !== ""
                ? "valid"
                : ""
            }`}
            onClick={SendDataBackEnd}
          >
            {!Loader ? <p>INICIAR SESIÓN</p> : <BtnLoader />}
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
