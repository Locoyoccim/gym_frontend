import "../singin/singin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../compartidos/memoria/AuthProvider";
import BtnLoader from "../../compartidos/Loader/BtnLoader";
import InputEye from "../../compartidos/inputEye/InputEye";
import { changeEvent, dataUserProps } from "../../../interfaces";
import axios from "axios";
import { Api_Url } from "../../../servicios/config";

interface Props {
  windowChange: (message: string) => void;
  windowState: string;
}

function CreateAccount({ windowChange, windowState }: Props) {
  const [inputType1, setInput1Type] = useState<string>("password");
  const [inputType2, setInput2Type] = useState<string>("password");
  const [data, setData] = useState<dataUserProps>({
    nombre: "",
    apellidos: "",
    email: "",
    username: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmationError, setConfirmationError] = useState<boolean>(true);
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex: RegExp =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=-{};:"<>,./?])(?=.*\d).{8,}$/;
  const navigate = useNavigate();
  const { Login } = useAuth();
  const [Loading, setLoading] = useState<boolean>(false);

  // cambio el tipo de input password, visualización de contraseña por el usuario
  const changeType1 = () => {
    setInput1Type(inputType1 === "password" ? "text" : "password");
  };
  const changeType2 = () => {
    setInput2Type(inputType2 === "password" ? "text" : "password");
  };

  // Validación de datos y actualización del estado
  const inputsValidations = (e: changeEvent, inputName: string) => {
    setData({ ...data, [inputName]: e.target.value });
    const value = e.target.value;
    switch (inputName) {
      case "email":
        // Validamos primero si el values esta vació, después si el regex coincide con el texto
        value === ""
          ? setEmailError("")
          : setEmailError(emailRegex.test(value) ? "" : "invalidEmail");
        break;
      case "password":
        value === ""
          ? setPasswordError("")
          : passwordRegex.test(value)
          ? ""
          : "invalidPassword";
        break;
      case "passwordConfirmation":
        data.password != value
          ? setConfirmationError(false)
          : setConfirmationError(true);
        break;
    }
  };
  // envió de datos del usuario al Backend
  const SendDataBackEnd = () => {
    setLoading(true);
    axios.post(`${Api_Url}/crear-usuario/`, data)
      .then((response) => {
        console.log("Envió con éxito");
        Login(response.data.access);
        navigate(`/userRegistration/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error, "Error al enviar datos");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* contenedor para crear un usuario nuevo */}
      <section className={`createAcount_container ${windowState}`}>
        <div className="img_singin">
          <i className="bi bi-door-open"></i>
        </div>
        <form className="create_acount_form">
          {/* captura correo */}
          <label htmlFor="get_email">correo electrónico</label>
          <input
            type="email"
            id="get_email"
            autoComplete="email"
            onChange={(e) => inputsValidations(e, "email")}
            required
          />
          <p className={`email_msj ${emailError}`}>
            Introduzca un email valido
          </p>
          {/* elección de contraseña */}
          <label htmlFor="password1">contraseña</label>
          <input
            type={inputType1}
            id="password1"
            autoComplete="new-password"
            onChange={(e) => inputsValidations(e, "password")}
            required
          />
          <InputEye operation={changeType1} />
          <p className={`password_msj ${passwordError}`}>
            la contraseña debe contener números, letras y un carácter especial
          </p>
          {/* validación la contraseña */}
          <label htmlFor="password_confirmation">repite tu contraseña</label>
          <input
            type={inputType2}
            id="password_confirmation"
            autoComplete="new-password"
            onChange={(e) => inputsValidations(e, "passwordConfirmation")}
            required
          />
          <InputEye operation={changeType2} />
          <p
            className={`confirmation_msj ${JSON.stringify(confirmationError)}`}
          >
            las contraseñas no coinciden
          </p>
          {/* captura de nombre de usuario */}
          <label htmlFor="user_name">nombre de usuario</label>
          <input
            type="text"
            id="user_name"
            autoComplete="username"
            onChange={(e) => inputsValidations(e, "username")}
            required
          />
          {/* nombres de nombre */}
          <label htmlFor="nombres">nombres</label>
          <input
            type="text"
            id="nombres"
            autoComplete="name"
            onChange={(e) => inputsValidations(e, "nombre")}
            required
          />
          {/* apellidos */}
          <label htmlFor="apellidos">apellidos</label>
          <input
            type="text"
            id="apellidos"
            autoComplete="family-name"
            onChange={(e) => inputsValidations(e, "apellidos")}
            required
          />
        </form>
        <div className="singin_buttons">
          <button
            className={`login ${
              data.email !== "" &&
              data.password !== "" &&
              data.nombre !== "" &&
              data.email !== ""
                ? "valid"
                : ""
            }`}
            onClick={SendDataBackEnd}
          >
            {!Loading ? <p>Crear cuenta</p> : <BtnLoader />}
          </button>
          <button
            className="create_acount_btn"
            onClick={() => windowChange("")}
          >
            TENGO CUENTA
          </button>
        </div>
      </section>
    </>
  );
}
export default CreateAccount;
