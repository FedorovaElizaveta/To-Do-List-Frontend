import clsx from "clsx";
import styles from "./Modal.module.css";
import { useEffect, type FC, type ReactNode } from "react";

interface Props {
  isOpen: boolean;
  cancelFn(): void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ isOpen, cancelFn, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (cancelFn) {
          cancelFn();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, cancelFn]);

  return (
    <div className={clsx(isOpen ? styles.modalWrapper : styles.disable)}>
      {children}
    </div>
  );
};

export default Modal;
