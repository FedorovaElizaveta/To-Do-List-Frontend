import styles from "./AddTask.module.css";
import plusIcon from "../../images/plus-icon.png";
import type { List } from "../../types";
import clsx from "clsx";
import Modal from "../Modal/Modal.tsx";
import TaskModalWindow from "../TaskModalWindow/TaskModalWindow.tsx";
import { useState } from "react";

interface Props {
  list: List;
}

const AddTask = ({ list }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <button
        className={clsx(styles.addTaskBtn, styles[list.themeColor])}
        onClick={handleOpen}
      >
        <img src={plusIcon} alt="add task icon" width={25} />
      </button>

      <Modal isOpen={open} cancelFn={handleClose}>
        <TaskModalWindow cancelFn={handleClose} action="addTask" />
      </Modal>
    </div>
  );
};

export default AddTask;
