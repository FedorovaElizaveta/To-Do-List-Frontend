import "../../App.css";
import styles from "./ListTask.module.css";
import type { Task } from "../../types";
import { useListStore } from "../../zustand/store";
import { useSearchParams } from "react-router-dom";
import { useState, type ChangeEvent, type FC, type MouseEvent } from "react";
import ManageTask from "../ManageTask/ManageTask.tsx";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";
import clsx from "clsx";

interface Props {
  task: Task;
  themeColor: string;
}

const ListTask: FC<Props> = ({ task, themeColor }) => {
  const updateTask = useListStore((state) => state.updateTask);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");
  const [isAdding, setIsAdding] = useState(false);
  const [focus, setFocus] = useState(false);

  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  };

  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!listId) throw new Error("List ID is not provided");

    updateTask(task.id, listId, { completed: !task.completed });
  };

  const openInput = () => {
    setIsAdding(true);
  };

  const cancelInput = () => {
    setIsAdding(false);
  };

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFocus(true);

    const { pageX, pageY } = event;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const contextMenuClose = () => {
    setFocus(false);
    setContextMenu(initialContextMenu);
  };

  return (
    <>
      {!isAdding ? (
        <li
          className={clsx(styles.task, focus && styles.taskFocus)}
          onContextMenu={handleContextMenu}
        >
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              id={task.id}
              checked={task.completed}
              onChange={handleChange}
              className={`${themeColor}TaskStatus`}
            />
            <label htmlFor={task.id}></label>

            <p onClick={openInput}>{task.text}</p>
          </div>
        </li>
      ) : (
        <ManageTask
          cancelInput={cancelInput}
          action="updateTask"
          task={task}
          themeColor={themeColor}
        />
      )}

      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={contextMenuClose}
          taskId={task.id}
          listId={listId}
        />
      )}
    </>
  );
};

export default ListTask;
