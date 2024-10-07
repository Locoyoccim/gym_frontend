import { useState } from "react";
import "../singin/singin.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BtnLoader from "../../compartidos/Loader/BtnLoader";
import InputEye from "../../compartidos/inputEye/InputEye";
import { userLogIn } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_Url } from "../../../servicios/config";
import { useAuth } from "../../compartidos/memoria/AuthProvider";
import { functionLogin, changeEvent } from "../../../interfaces";
import Notification from "../../compartidos/NotificationResponse/Notification";

function SingIn({ windowChange }: functionLogin) {
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("password");
  const { Login } = useAuth();
  const [SingInData, SetSingInData] = useState<userLogIn>({
    email: "",
    password: "",
  });

  const changeType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const InputData = (e: changeEvent, field: string) => {
    SetSingInData({ ...SingInData, [field]: e.target.value.trim() });
  };

  const SendDataBackEnd = () => {
    setIsLoading(true);
    axios
      .post(`${Api_Url}/log-in/`, SingInData)
      .then((response) => {
        Login(response.data.access);
        navigate(`/dashboard/${response.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        setIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      });
  };

  return (
    <section id="login_section">
      <Notification tittle="correo/contraseña incorrecto" isOpen={isOpen} />
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
            {!IsLoading ? <p>INICIAR SESIÓN</p> : <BtnLoader />}
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
