import "./footer.css";
import Timer from "../../compartidos/stopwatch/Timer";
import { functions } from "../../../interfaces";


function Footer({ setModalConfirmation }: functions) {
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
        <button className="historia_btn" >
          Historia
        </button>
      </section>
      
    </>
  );
}

export default Footer;
