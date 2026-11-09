import clsx from "clsx";
import styles from "./Modal.module.css";
import React, { useEffect } from "react";

interface Props {
  isOpen: boolean;
  cancelFn(): void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = (props) => {
  const { isOpen, cancelFn, children } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
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
