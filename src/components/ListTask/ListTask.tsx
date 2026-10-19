import styles from "./ListTask.module.css";
import type { Task } from "../../types";

const ListTask = (data: { task: Task }) => {
  const { task } = data;

  return (
    <li className={styles.task}>
      <input type="checkbox" id={task.id} />
      <label className={styles.taskText} htmlFor={task.id}>
        {task.text}
      </label>
    </li>
  );
};

export default ListTask;
