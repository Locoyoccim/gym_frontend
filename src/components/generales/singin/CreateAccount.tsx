import "../singin/singin.css";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../compartidos/memoria/AuthProvider";
import BtnLoader from "../../compartidos/Loader/BtnLoader";

interface Props {
  windowChange: (message: string) => void;
  windowState: string;
}

interface dataProps {
  nombre: string;
  apellidos: string;
  email: string;
  username: string;
  password: string;
}

type chengeEvent = ChangeEvent<HTMLInputElement>;

function CreateAccount({ windowChange, windowState }: Props) {
  const [inputType, setInputType] = useState<string>("password");
  const [eyeAnimation, setEyeAnitmation] = useState<string>("");
  const [data, setData] = useState<dataProps>({
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
  const [Loading, setLoading] = useState<Boolean>(false);

  // cambio el tipo de input password, visulisacion de contrase;a por el usuario
  const changeType = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
    setEyeAnitmation(eyeAnimation === "" ? "animation_in" : "");
  };

  // Validacion de datos y actulizacion del estado
  const inputsValidations = (e: chengeEvent, inputName: string) => {
    setData({ ...data, [inputName]: e.target.value });
    switch (inputName) {
      case "email":
        if (e.target.value === "") {
          setEmailError("");
        } else {
          setEmailError(emailRegex.test(e.target.value) ? "" : "invalidEmail");
        }
        break;
      case "password":
        if (e.target.value === "") {
          setPasswordError("");
        } else {
          setPasswordError(
            passwordRegex.test(e.target.value) ? "" : "invalidPassword"
          );
        }
        break;
      case "passwordConfirmation":
        if (data.password != e.target.value) {
          setConfirmationError(false);
        } else {
          setConfirmationError(true);
        }
        break;
    }
  };
  // envio de datos del usuario al Backend
  const SendDataBackEnd = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://gymbackend-production.up.railway.app/rutinas/crear-usuario/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Error en la solicitud");
      const result = await response.json();
      console.log("Datos enviados Exitosamente", result);
      setLoading(false);
      Login(result.access);
      const id_user = result.id;
      return navigate(`/userRegistration/${id_user}`);
    } catch {
      console.error("Error al enviar informacion:", Error);
      setLoading(false);
    }
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
          <label htmlFor="get_email">correo electronico</label>
          <input
            type="email"
            id="get_email"
            autoComplete="email"
            onChange={(e) => inputsValidations(e, "email")}
          />
          <p className={`email_msj ${emailError}`}>
            Introduzca un email valido
          </p>
          {/* eleccion de contrase;a */}
          <label htmlFor="password1">contraseña</label>
          <input
            type={inputType}
            id="password1"
            autoComplete="new-password"
            onChange={(e) => inputsValidations(e, "password")}
          />
          <button
            className={`show_password ${eyeAnimation}`}
            onClick={(e) => changeType(e)}
          >
            <i className="bi bi-eye-fill"></i>
          </button>
          <p className={`password_msj ${passwordError}`}>
            la contraseña debe contener numeros, letras y un caracter especial
          </p>
          {/* validacion la contrase;a */}
          <label htmlFor="password_confirmation">repite tu contraseña</label>
          <input
            type={inputType}
            id="password_confirmation"
            autoComplete="new-password"
            onChange={(e) => inputsValidations(e, "passwordConfirmation")}
          />
          <button
            className={`show_password ${eyeAnimation}`}
            onClick={(e) => changeType(e)}
          >
            <i className="bi bi-eye-fill"></i>
          </button>
          <p
            className={`confirmation_msj ${JSON.stringify(confirmationError)}`}
          >
            las contraseñas no coninciden
          </p>
          {/* captura de nombre de usuario */}
          <label htmlFor="user_name">nombre de usuario</label>
          <input
            type="text"
            id="user_name"
            autoComplete="username"
            onChange={(e) => inputsValidations(e, "username")}
          />
          {/* nombres de nombre */}
          <label htmlFor="nombres">nombres</label>
          <input
            type="text"
            id="nombres"
            autoComplete="name"
            onChange={(e) => inputsValidations(e, "nombre")}
          />
          {/* apellidos */}
          <label htmlFor="apellidos">apellidos</label>
          <input
            type="text"
            id="apellidos"
            autoComplete="family-name"
            onChange={(e) => inputsValidations(e, "apellidos")}
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
