import type { FC } from "react";
import { createPortal } from "react-dom";
import styles from "./ContextMenu.module.css";

interface Props {
  x: number;
  y: number;
}

const ContextMenu: FC<Props> = ({ x, y }) => {
  return createPortal(
    <div
      style={{ top: `${y}px`, left: `${x}px` }}
      className={styles.contextMenu}
    >
      ContextMenu
    </div>,
    document.body,
  );
};

export default ContextMenu;
