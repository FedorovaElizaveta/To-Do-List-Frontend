import styles from "./AddTask.module.css";
import { useSearchParams } from "react-router-dom";
import { useRef, useEffect, type FocusEvent } from "react";
import { useListStore } from "../../zustand/store";

interface Prop {
  closeInput(): void;
}

const AddTask = ({ closeInput }: Prop) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTask = useListStore((state) => state.addTask);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  useEffect((): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const userInput = event.target.value;

    if (!userInput.trim()) {
      // closeInput();
      return;
    }

    if (!listId) throw new Error("List ID is not provided");

    addTask(listId, userInput);

    closeInput();
  }

  return (
    <li className={styles.textInputWrapper}>
      <input type="text" ref={inputRef} name="newTask" onBlur={handleBlur} />
    </li>
  );
};

export default AddTask;
