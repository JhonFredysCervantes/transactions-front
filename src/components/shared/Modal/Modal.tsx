import Modal from "react-modal";
import styles from "./Modal.module.css";
import { Button } from "../Button";

interface ModalProps {
  isModalOpen: boolean;
  isErrorMessage: boolean;
  isWarningMessage: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalMessage: string;
}

export function ModalCustom(props: ModalProps) {
  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.setIsModalOpen(false)}
      contentLabel="Mensaje Modal"
      className={styles.Modal}
    >
      <h2 className={styles.modalHeader}>{props.modalMessage}</h2>
      <p>
        {props.isErrorMessage ? "❌ " : props.isWarningMessage ? "⚠️ " : "✅ "}
      </p>
      <Button
        isPrimary={false}
        disabled={false}
        onClick={() => props.setIsModalOpen(false)}
      >
        Cerrar
      </Button>
    </Modal>
  );
}
