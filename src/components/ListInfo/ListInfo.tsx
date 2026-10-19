import styles from "./ListInfo.module.css";
import listImg from "../../images/list.png";
import type { List } from "../../types";
import clsx from "clsx";
import { useListStore } from "../../zustand/store.ts";

const ListInfo = (data: { list: List }) => {
  const { list } = data;
  const setSelectedListId = useListStore((state) => state.setSelectedListId);
  const selectedListId = useListStore((state) => state.selectedListId);

  const isSelected = list.id === selectedListId;

  return (
    <li
      className={styles.task}
      onClick={() => {
        setSelectedListId(list.id);
      }}
    >
      <div className={styles.iconTitleWrapper}>
        <div className={clsx(styles.iconWrapper, styles[list.iconColor])}>
          <img src={listImg} alt="list icon" width={25} />
        </div>
        <p className={clsx(styles.listTitle, isSelected && styles.selected)}>
          {list.title}
        </p>
      </div>

      <p className={styles.taskTotal}>{list.tasks.length}</p>
    </li>
  );
};

export default ListInfo;
