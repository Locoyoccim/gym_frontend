import "bootstrap-icons/font/bootstrap-icons.css";
import "../userInfoForm/userInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BtnLoader from "../../compartidos/Loader/BtnLoader";
import { infoUserProps, changeEvent } from "../../../interfaces";
import axios from "axios";
import { Api_Url } from "../../../servicios/config";
import GetUserInfo from "../../../servicios/GetUserInfo";
import useToken from "../../hooks/useToken";

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  return date;
};

function UserInfo() {
  const { getToken } = useToken();
  const { id_user } = useParams<{ id_user: string }>();
  const { data } = GetUserInfo(`userinfo/${id_user}/`, getToken());
  const [Loading, setLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<infoUserProps>({
    id_user: id_user ? parseInt(id_user, 10) : 0,
    actualizacion: getCurrentDate(),
    edad: 0,
    peso_kg: 0,
    estatura: 0,
    genero: "m",
  });

  const { edad, peso_kg, estatura, genero } = userData;

  // Actualiza la información del usuario
  const dataChange = (e: changeEvent, field: keyof infoUserProps) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  useEffect(() => {
    setIsEditMode(!!data); // Si hay data, estamos en modo edición, por lo tanto isEditMode será true
    if (data) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...data, // Actualizamos los valores de userData con los de data
      }));
    }
  }, [data]);

  const SendToBackEnd = () => {
    setLoading(true);
    if (isEditMode) {
      axios
        .put(`${Api_Url}/userinfo/${id_user}`, userData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          navigate(`/profile/${id_user}`);
        });
    } else {
      axios
        .post(`${Api_Url}/newuserinfo/`, userData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          navigate("/");
        });
    }
  };

  return (
    <section id="userInfo_section">
      <div className="secondary_user_container">
        <div id="userInfo_img">
          <i className="bi bi-person-rolodex"></i>
        </div>
        <h1>{isEditMode ? "Editar Peril" : "Creando Perfil"}</h1>
        <form action="" id="collect_userinfo">
          <label htmlFor="age">cual es tu edad?</label>
          <input
            type="number"
            id="age"
            inputMode="numeric"
            placeholder={JSON.stringify(edad)}
            onChange={(e) => dataChange(e, "edad")}
          />
          <label htmlFor="height">cual es tu estatura cm?</label>
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
        <button className="crear" onClick={SendToBackEnd}>
          {!Loading ? <p>enviar</p> : <BtnLoader />}
        </button>
      </div>
    </section>
  );
}

export default UserInfo;
