import styles from "./ToDoList.module.css";
import type { List, State } from "../../types";
import { useListStore } from "../../zustand/store.js";
import ListTask from "../ListTask/ListTask.js";
import { Link } from "react-router-dom";

const ToDoList = () => {
  const lists: List[] = useListStore((state: State) => state.lists);

  return (
    <div>
      <h1 className={styles.mainTitle}>My Lists</h1>
      <ul className={styles.list}>
        {lists !== null ? (
          lists.map((list: List) => (
            <Link to="/">
              <ListTask list={list} key={list.id} />
            </Link>
          ))
        ) : (
          <p>You have no lists</p>
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
