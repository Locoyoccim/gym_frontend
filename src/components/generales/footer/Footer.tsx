import { useState } from "react";
import "./footer.css";
import Cronometro from "../../compartidos/stopwatch/Cronometro";

type props = {
  sendToBackend: () => void;
  setShowModal: (value: string) => void;
};

function Footer({ sendToBackend, setShowModal }: props) {
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Detiene el cronometro del componente StopWatch
  const handleStopTimer = () => {
    setIsRunning(false);
  };

  return (
    <>
      <section className={`footer`}>
        <button
          className="finish"
          onClick={() => {
            handleStopTimer(), sendToBackend();
          }}
        >
          Finalizar
        </button>
        <Cronometro isRunning={isRunning} />
        <button className="other" onClick={() => setShowModal("open_modal")}>
          Historia
        </button>
      </section>
    </>
  );
}

export default Footer;
