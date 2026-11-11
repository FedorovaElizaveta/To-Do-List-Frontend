import styles from "./ListTask.module.css";
import type { Task } from "../../types";
import infoIcon from "../../images/info-icon.png";
import pencilIcon from "../../images/pencil-icon.png";
import deletelIcon from "../../images/delete-icon.png";
import { useListStore } from "../../zustand/store";
import { useSearchParams } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import Modal from "../Modal/Modal.tsx";
import TaskModalWindow from "../TaskModalWindow/TaskModalWindow.tsx";

interface Props {
  task: Task;
}

const ListTask = ({ task }: Props) => {
  const deleteTask = useListStore((state) => state.deleteTask);
  const updateTask = useListStore((state) => state.updateTask);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  const manageDelete = () => {
    if (!listId) throw new Error("List ID is not provided");

    deleteTask(task.id, listId);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!listId) throw new Error("List ID is not provided");

    console.log("click");

    updateTask(task.id, listId, { completed: !task.completed });
  };

  return (
    <li className={styles.task}>
      <div className={styles.dropdown}>
        <button type="button" className={styles.dropbtn}>
          <img src={infoIcon} alt="info icon" width={20} />
        </button>

        <div className={styles.dropdownContent}>
          <button type="button" onClick={handleOpen}>
            <img src={pencilIcon} alt="change list" width={15} />
            <p>Edit</p>
          </button>
          <button type="button" onClick={manageDelete}>
            <img src={deletelIcon} alt="delete list" width={13} />
            <p>Delete</p>
          </button>
        </div>
      </div>

      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id={task.id}
          checked={task.completed}
          onChange={handleChange}
        />
        <label htmlFor={task.id}>{task.text}</label>
      </div>

      <Modal isOpen={open} cancelFn={handleClose}>
        <TaskModalWindow
          cancelFn={handleClose}
          action="updateTask"
          taskId={task.id}
          taskText={task.text}
        />
      </Modal>
    </li>
  );
};

export default ListTask;
