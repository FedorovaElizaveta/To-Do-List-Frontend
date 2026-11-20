import "../../App.css";
import styles from "./SelectedList.module.css";
import { useListStore } from "../../zustand/store.ts";
import clsx from "clsx";
import ListTask from "../ListTask/ListTask.tsx";
import { useSearchParams } from "react-router-dom";
import plusIcon from "../../images/plus-icon.png";
import ManageTask from "../ManageTask/ManageTask.tsx";
import { useState } from "react";

const SelectedList = () => {
  const lists = useListStore((state) => state.lists);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");
  const list = lists.find((list) => list.id === listId);

  const [isAdding, setIsAdding] = useState(false);

  function closeInput() {
    setIsAdding(false);
  }

  return (
    <div className={styles.listWrapper}>
      {list ? (
        <div>
          <div className={styles.titleNTotalWrapper}>
            <h1 className={clsx(styles.listTitle, `${[list.themeColor]}Color`)}>
              {list.title}
            </h1>
            <p className={clsx(styles.taskTotal, `${[list.themeColor]}Color`)}>
              {list.tasks.length}
            </p>
          </div>
          {list.tasks.length !== 0 ? (
            <ul className={styles.taskList}>
              {list.tasks.map((task) => (
                <ListTask task={task} key={task.id} />
              ))}
              {isAdding && (
                <ManageTask cancelInput={closeInput} action="addTask" />
              )}
            </ul>
          ) : (
            <ul>
              {isAdding ? (
                <ManageTask cancelInput={closeInput} action="addTask" />
              ) : (
                <li className={styles.noRemindersMsg}>No Reminders</li>
              )}
            </ul>
          )}

          <button
            className={clsx(
              styles.addTaskBtn,
              `${[list.themeColor]}Background`,
            )}
            onClick={() => setIsAdding(true)}
          >
            <img src={plusIcon} alt="add task icon" width={25} />
          </button>
        </div>
      ) : (
        <p className={styles.listTitle}>Select List</p>
      )}
    </div>
  );
};

export default SelectedList;
