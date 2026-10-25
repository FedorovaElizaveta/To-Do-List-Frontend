import styles from "./ListInfo.module.css";
import listImg from "../../images/list.png";
import type { List } from "../../types";
import clsx from "clsx";
import { useListStore } from "../../zustand/store.ts";
import { useState } from "react";
import Modal from "../Modal/Modal.tsx";
import pencilIcon from "../../images/pencil-icon.png";
import { useSearchParams } from "react-router-dom";

const ListInfo = (data: { list: List }) => {
  const { list } = data;
  const setSelectedListId = useListStore((state) => state.setSelectedListId);
  const selectedListId = useListStore((state) => state.selectedListId);

  const [searchParams, setSearchParams] = useSearchParams();

  const isSelected = list.id === selectedListId;

  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();

    setSearchParams({ listId: list.id });

    handleOpen();
  }

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <li
      className={styles.task}
      onClick={() => {
        setSelectedListId(list.id);
      }}
    >
      <div className={styles.iconTitleWrapper}>
        <div className={clsx(styles.iconWrapper, styles[list.themeColor])}>
          <img src={listImg} alt="list icon" width={25} />
        </div>
        <p className={clsx(styles.listTitle, isSelected && styles.selected)}>
          {list.title}
        </p>
      </div>

      <div className={styles.totalNBtnWrapper}>
        <p className={styles.taskTotal}>{list.tasks?.length}</p>

        <button
          type="button"
          onClick={handleClick}
          className={styles.updateBtn}
        >
          <img src={pencilIcon} alt="pencil icon" width={20} />
        </button>
      </div>

      <Modal isOpen={open} onClose={handleClose} action="updateList" />
    </li>
  );
};

export default ListInfo;
