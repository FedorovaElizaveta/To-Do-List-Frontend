import type { FC } from "react";
import { createPortal } from "react-dom";
import styles from "./ContextMenu.module.css";
import deleteIcon from "../../images/delete-icon.png";
import { useListStore } from "../../zustand/store";

interface Props {
  x: number;
  y: number;
  taskId: string;
  listId: string | null;
}

const ContextMenu: FC<Props> = ({ x, y, taskId, listId }) => {
  const deleteTask = useListStore((state) => state.deleteTask);

  const handleClick = () => {
    if (!listId) throw new Error("List ID is not provided");

    deleteTask(taskId, listId);
  };

  return createPortal(
    <div
      style={{ top: `${y}px`, left: `${x}px` }}
      className={styles.contextMenu}
    >
      <button type="button" onClick={handleClick}>
        <img src={deleteIcon} alt="delete icon" width={15} />
        <p>Delete</p>
      </button>
    </div>,
    document.body,
  );
};

export default ContextMenu;
