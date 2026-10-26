import clsx from "clsx";
import styles from "./TaskModal.module.css";
import { useListStore } from "../../zustand/store.ts";
import { useState } from "react";

interface Modal {
  isOpen: boolean;
  onClose(): void;

  action: "addTask" | "updateTask";
}

const TaskModal = (data: Modal) => {
  const { isOpen, onClose, action } = data;
  const addTask = useListStore((state) => state.addTask);
  const updateTask = useListStore((state) => state.updateTask);
  const listId = useListStore((state) => state.selectedListId);

  function manageTask(event) {
    event.preventDefault();

    const text = event.target["text"].value;

    if (!text) {
      console.error("Text is not provided");
      return;
    }

    if (!listId) {
      console.error("List ID is not provided");
      return;
    }

    switch (action) {
      case "addTask": {
        addTask(listId, text);
        break;
      }
      case "updateTask": {
        updateTask(listId, text);
        break;
      }
    }

    event.target.reset();
    onClose();
  }

  return (
    <div className={clsx(isOpen ? styles.modalWrapper : styles.disable)}>
      <div className={styles.modal}>
        <h2 className={styles.header}>
          {action === "addTask" ? "New Task" : "Change Text"}
        </h2>
        <form onSubmit={manageTask}>
          <textarea
            id="text"
            name="text"
            rows={6}
            className={styles.textInput}
          />

          <div className={styles.btnsWrapper}>
            <button type="button" onClick={onClose}>
              Close
            </button>
            <button type="submit">OK</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
