import "../../App.css";
import styles from "./ManageTask.module.css";
import { useSearchParams } from "react-router-dom";
import {
  useRef,
  useEffect,
  type FocusEvent,
  type FC,
  type KeyboardEvent,
} from "react";
import { useListStore } from "../../zustand/store";
import type { Task } from "../../types";
import clsx from "clsx";

interface Props {
  cancelInput(): void;
  action: "addTask" | "updateTask";
  task?: Task;
  themeColor: string;
}

const ManageTask: FC<Props> = ({ cancelInput, action, task, themeColor }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const addTask = useListStore((state) => state.addTask);
  const updateTask = useListStore((state) => state.updateTask);
  const deleteTask = useListStore((state) => state.deleteTask);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  useEffect((): void => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const manageTask = (
    event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    const userInput = event.currentTarget.value;

    if (!listId) throw new Error("List ID is not provided");

    switch (action) {
      case "addTask":
        if (!userInput.trim()) {
          cancelInput();
          return;
        }

        addTask(listId, { text: userInput });
        break;
      case "updateTask":
        if (!task?.id) throw new Error("Task ID is not provided");

        if (!userInput) deleteTask(task.id, listId);

        updateTask(task.id, listId, { text: userInput });
        break;

      default:
        throw new Error("Invalid operation");
    }

    cancelInput();
  };

  return (
    <li className={styles.manageTaskLi}>
      <input
        type="checkbox"
        id="manageTask"
        className={clsx(styles.taskStatus, `${themeColor}TaskStatus`)}
        checked={task && task.completed}
        readOnly
      />
      <label htmlFor="manageTask"></label>

      <input
        ref={textInputRef}
        type="text"
        name="newTask"
        onBlur={manageTask}
        onKeyDown={(e) => {
          if (e.key === "Enter") manageTask(e);
        }}
        className={styles.taskTextInput}
        defaultValue={task?.text && task.text}
      />
    </li>
  );
};

export default ManageTask;
