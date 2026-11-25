import styles from "./ContextMenu.module.css";
import { useRef, type FC } from "react";
import { createPortal } from "react-dom";
import deleteIcon from "../../images/delete-icon.png";
import { useListStore } from "../../zustand/store";
import { useOnClickOuside } from "../../utilts/hooks/useOnClickOutside";

interface Props {
  x: number;
  y: number;
  closeContextMenu: () => void;
  taskId: string;
  listId: string | null;
}

const ContextMenu: FC<Props> = ({ x, y, closeContextMenu, taskId, listId }) => {
  const deleteTask = useListStore((state) => state.deleteTask);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useOnClickOuside(contextMenuRef, closeContextMenu);

  const handleTaskDelete = () => {
    if (!listId) throw new Error("List ID is not provided");

    deleteTask(taskId, listId);
  };

  return createPortal(
    <div
      ref={contextMenuRef}
      style={{ top: `${y}px`, left: `${x}px` }}
      className={styles.contextMenu}
    >
      <button type="button" onClick={handleTaskDelete}>
        <img src={deleteIcon} alt="delete icon" width={15} />
        <p>Delete</p>
      </button>
    </div>,
    document.body,
  );
};

export default ContextMenu;
