import styles from "./MyLists.module.css";
import { useListStore } from "../../zustand/store.ts";
import ListInfo from "../ListInfo/ListInfo.js";

const ToDoLists = () => {
  const lists = useListStore((state) => state.lists);

  return (
    <div>
      <h2 className={styles.mainTitle}>My Lists</h2>
      <ul className={styles.list}>
        {lists.length !== 0 &&
          lists.map((list) => <ListInfo list={list} key={list.id} />)}
      </ul>
    </div>
  );
};

export default ToDoLists;
