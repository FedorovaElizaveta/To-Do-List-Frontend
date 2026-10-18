import styles from "./ListTask.module.css";
import listImg from "../../images/list.png";
import arrow from "../../images/arrow.png";
import type { List } from "../../types";

const ListTask = (data: { list: List }) => {
  const list = data.list;

  return (
    <li className={styles.task}>
      <div className={styles.iconTitleWrapper}>
        <div className={styles.iconWrapper}>
          <img src={listImg} alt="list icon" width={25} />
        </div>
        <p>{list.title}</p>
      </div>

      <div className={styles.totalWrapper}>
        <p>{list.tasks.length}</p>
        <img src={arrow} alt="arrow right" width={10} />
      </div>
    </li>
  );
};

export default ListTask;
