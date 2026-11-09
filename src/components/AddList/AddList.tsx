import styles from "./AddList.module.css";
import plusIcon from "../../images/plus-icon.png";
import { useState } from "react";
import Modal from "../Modal/Modal.tsx";
import ListModalWindow from "../ListModalWindow/ListModalWindow.tsx";

const AddList = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <button type="button" className={styles.addListBtn} onClick={handleOpen}>
        <img src={plusIcon} alt="add list icon" width={20} />
      </button>
      <Modal isOpen={open} cancelFn={handleClose}>
        <ListModalWindow cancelFn={handleClose} action="addList" />
      </Modal>
    </div>
  );
};

export default AddList;
