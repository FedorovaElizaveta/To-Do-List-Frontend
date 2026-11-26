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
  const completed = list?.tasks.filter((task) => task.completed);
  const [isAdding, setIsAdding] = useState(false);

  const closeInput = () => {
    setIsAdding(false);
  };

  return (
    <div className={styles.listWrapper}>
      {list ? (
        <>
          <div className={styles.listInfoWrapper}>
            <div className={styles.titleNTotalWrapper}>
              <h1 className={clsx(styles.title, `${[list.themeColor]}Color`)}>
                {list.title}
              </h1>
              <p
                className={clsx(styles.taskTotal, `${[list.themeColor]}Color`)}
              >
                {list.tasks.length}
              </p>
            </div>
            <div className={styles.completedNum}>
              <p>{completed?.length}</p>
              <p>Completed</p>
            </div>
          </div>
          {list.tasks.length !== 0 ? (
            <ul>
              {list.tasks.map((task) => (
                <ListTask
                  task={task}
                  key={task.id}
                  themeColor={list.themeColor}
                />
              ))}
              {isAdding && (
                <ManageTask
                  cancelInput={closeInput}
                  action="addTask"
                  themeColor={list.themeColor}
                />
              )}
            </ul>
          ) : (
            <ul>
              {isAdding ? (
                <ManageTask
                  cancelInput={closeInput}
                  action="addTask"
                  themeColor={list.themeColor}
                />
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
        </>
      ) : (
        <h1 className={clsx(styles.title, styles.selectListTitle)}>
          Select List
        </h1>
      )}
    </div>
  );
};

export default SelectedList;
