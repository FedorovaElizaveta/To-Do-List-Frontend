import styles from "./ListInfo.module.css";
import listImg from "../../images/list.png";
import type { List } from "../../types";
import clsx from "clsx";
import { useListStore } from "../../zustand/store.ts";
import { useState } from "react";
import Modal from "../Modal/Modal.tsx";
import infoIcon from "../../images/info-icon.png";
import pencilIcon from "../../images/pencil-icon.png";
import deletelIcon from "../../images/delete-icon.png";
import { useSearchParams } from "react-router-dom";

const ListInfo = (data: { list: List }) => {
  const { list } = data;
  const deleteList = useListStore((state) => state.deleteList);

  const [searchParams, setSearchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  const isSelected = list.id === listId;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setSearchParams({ listId: list.id });
    setOpen(true);
  };

  return (
    <li
      className={styles.task}
      onClick={() => {
        setSearchParams({ listId: list.id });
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

        <div className={styles.dropdown}>
          <button type="button" className={styles.dropbtn}>
            <img src={infoIcon} alt="info icon" width={20} />
          </button>

          <div className={styles.dropdownContent}>
            <button type="button" onClick={handleOpen}>
              <img src={pencilIcon} alt="change list" width={15} />
              <p>Rename</p>
            </button>
            <button type="button" onClick={() => deleteList(list.id)}>
              <img src={deletelIcon} alt="delete list" width={13} />
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={handleClose} action="updateList" />
    </li>
  );
};

export default ListInfo;
