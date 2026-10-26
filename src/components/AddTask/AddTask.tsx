import styles from "./AddTask.module.css";
import plusIcon from "../../images/plus-icon.png";
import type { List } from "../../types";
import clsx from "clsx";
import TaskModal from "../TaskModal/TaskModal.tsx";
import { useState } from "react";

const AddTask = (data: { list: List }) => {
  const { list } = data;

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

      <TaskModal isOpen={open} onClose={handleClose} action="addTask" />
    </div>
  );
};

export default AddTask;
