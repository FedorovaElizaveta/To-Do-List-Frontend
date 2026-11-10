import styles from "./TaskModalWindow.module.css";
import { useListStore } from "../../zustand/store.ts";
import { useSearchParams } from "react-router-dom";
import { type SubmitEvent } from "react";

interface Props {
  cancelFn(): void;
  action: "addTask" | "updateTask";
  taskId?: string;
  taskText?: string;
}

const TaskModal: React.FC<Props> = (props) => {
  const { cancelFn, action, taskId, taskText } = props;
  const addTask = useListStore((state) => state.addTask);
  const updateTask = useListStore((state) => state.updateTask);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  const manageTask = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = event.target["text"].value;

    if (!text) throw new Error("Text is not provided");

    if (!listId) throw new Error("List ID is not provided");

    switch (action) {
      case "addTask": {
        addTask(listId, text);
        break;
      }
      case "updateTask": {
        if (!taskId) throw new Error("Task ID is not provided");
        updateTask(taskId, listId, { text });
        break;
      }
    }

    event.target.reset();
    cancelFn();
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.header}>
        {action === "addTask" ? "New Task" : "Change Text"}
      </h2>
      <form onSubmit={manageTask} id="myForm">
        <textarea
          id="text"
          name="text"
          rows={6}
          className={styles.textInput}
          placeholder="Type task..."
          defaultValue={taskText && taskText}
        />

        <div className={styles.formControls}>
          <button type="button" onClick={cancelFn}>
            Close
          </button>
          <button type="submit">OK</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
