import styles from "./SelectedList.module.css";
import { useListStore } from "../../zustand/store.ts";
import clsx from "clsx";
import ListTask from "../ListTask/ListTask.tsx";

const SelectedList = () => {
  const lists = useListStore((state) => state.lists);
  const selectedListId = useListStore((state) => state.selectedListId);
  const list = lists.find((list) => list.id === selectedListId);

  return (
    <div className={styles.listWrapper}>
      {list ? (
        <div>
          <div className={styles.titleNTotalWrapper}>
            <h1 className={clsx(styles.listTitle, styles[list.themeColor])}>
              {list.title}
            </h1>
            <p className={clsx(styles.taskTotal, styles[list.themeColor])}>
              {list.tasks.length}
            </p>
          </div>
          {list.tasks.length !== 0 ? (
            <ul className={styles.taskList}>
              {list.tasks.map((task) => (
                <ListTask task={task} key={task.id} />
              ))}
            </ul>
          ) : (
            <p>No Reminders</p>
          )}
        </div>
      ) : (
        <p className={styles.listTitle}>Select List</p>
      )}
    </div>
  );
};

export default SelectedList;
