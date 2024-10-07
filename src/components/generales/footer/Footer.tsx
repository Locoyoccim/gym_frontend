import "./footer.css";
import Timer from "../../compartidos/stopwatch/Timer";
import { functions } from "../../../interfaces";

function Footer({ setModalConfirmation, handleModal }: functions) {
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
        <button className="historia_btn" onClick={() => handleModal()}>
          <i className="bi bi-node-plus"></i>
        </button>
      </section>
    </>
  );
}

export default Footer;
