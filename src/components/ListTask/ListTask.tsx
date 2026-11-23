import styles from "./ListTask.module.css";
import type { Task } from "../../types";
import { useListStore } from "../../zustand/store";
import { useSearchParams } from "react-router-dom";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import ManageTask from "../ManageTask/ManageTask.tsx";
import ContextMenu from "../ContextMenu/ContextMenu.tsx";

interface Props {
  task: Task;
  themeColor: string;
}

const ListTask = ({ task, themeColor }: Props) => {
  const updateTask = useListStore((state) => state.updateTask);
  // const deleteTask = useListStore((state) => state.deleteTask);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

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

  const [isAdding, setIsAdding] = useState(false);

  function openInput() {
    setIsAdding(true);
  }

  function cancelInput() {
    setIsAdding(false);
  }

  function handleContextMenu(event: MouseEvent<HTMLElement>) {
    event.preventDefault();

    const { pageX, pageY } = event;
    setContextMenu({ show: true, x: pageX, y: pageY });

    // if (!listId) throw new Error("List ID is not provided");

    // deleteTask(task.id, listId);
  }

  return (
    <>
      {!isAdding ? (
        <li className={styles.task} onContextMenu={handleContextMenu}>
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

      {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} />}
    </>
  );
};

export default ListTask;
