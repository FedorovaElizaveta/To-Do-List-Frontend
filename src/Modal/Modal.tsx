import clsx from "clsx";
import styles from "./Modal.module.css";

const Modal = (data: { isOpen: boolean; onClose(): void }) => {
  const { isOpen, onClose } = data;

  return (
    <div className={clsx(!isOpen ? styles.disable : styles.modalWrapper)}>
      <div className={styles.modal}>
        <label htmlFor="title">Name:</label>
        <input type="text" />

        <div>
          <p>Colour:</p>
          <input type="radio" id="red" value="red" />
          <input type="radio" id="orange" value="orange" />
          <input type="radio" id="yellow" value="yellow" />
          <input type="radio" id="green" value="green" />
          <input type="radio" id="blue" value="blue" />
          <input type="radio" id="purple" value="purple" />
        </div>

        <div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button">OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
