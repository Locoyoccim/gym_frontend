import "./confirmationModal.css";
import BtnLoder from "../../Loader/BtnLoader";

interface modalProps {
  ModalTittle: string;
  ModalMsj: string;
  ConfirmationMsj: string;
  ReturnMsj: string;
  sendToBackend: () => void;
  setModalConfirmation: (value: string) => void;
  ModalState: string;
  isLoading: boolean;
}

function ConfirmationModal({
  ModalTittle,
  ModalMsj,
  ConfirmationMsj,
  ReturnMsj,
  sendToBackend,
  setModalConfirmation,
  ModalState,
  isLoading,
}: modalProps) {
  return (
    // ModalState control la apertura y ciere del modal con la clase openConfirmation

    <div id="modalConfirmation" className={ModalState}>
      <div className="done-container">
        <i className="bi bi-check-circle-fill"></i>
      </div>

      <h2 className="modal_tittle">{ModalTittle}</h2>
      <p className="modal_msj">{ModalMsj}</p>
      <div className="modalBtns">
        <button className="confirmationBtn" onClick={() => sendToBackend()}>
          {!isLoading ? ConfirmationMsj : <BtnLoder />}
        </button>
        <button className="cancelBtn" onClick={() => setModalConfirmation("")}>
          {ReturnMsj}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
