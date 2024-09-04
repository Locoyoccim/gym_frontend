import "./footer.css";
import Timer from "../../compartidos/stopwatch/Timer";

type props = {
  setModalConfirmation: (value: string) => void;
  setShowModal: (value: string) => void;
};

function Footer({ setModalConfirmation, setShowModal }: props) {
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
