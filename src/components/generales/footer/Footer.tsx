import "./footer.css";
import Timer from "../../compartidos/stopwatch/Timer";
import { functions } from "../../../interfaces";


function Footer({ setModalConfirmation, setShowModal }: functions) {
  return (
    <>
      <section className={`footer`}>
        <button
          className="finish_btn"
          onClick={() => {
            setModalConfirmation("openConfirmation");
          }}
        >
          Finalizar
        </button>
        <Timer />
        <button className="historia_btn" onClick={() => setShowModal("open_modal")}>
          Historia
        </button>
      </section>
      
    </>
  );
}

export default Footer;
