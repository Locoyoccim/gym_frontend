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
          className="finish"
          onClick={() => {
            setModalConfirmation("openConfirmation");
          }}
        >
          Finalizar
        </button>
        <button className="other" onClick={() => setShowModal("open_modal")}>
          Historia
        </button>
      </section>
      <Timer />
    </>
  );
}

export default Footer;
