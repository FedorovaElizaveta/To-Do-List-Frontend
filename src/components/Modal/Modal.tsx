import styles from "./Modal.module.css";
import clsx from "clsx";
import { useListStore } from "../../zustand/store.ts";
import { useLocation, useSearchParams } from "react-router-dom";

interface Modal {
  isOpen: boolean;
  onClose(): void;

  action: "addList" | "updateList";
}

const Modal = (data: Modal) => {
  const { isOpen, onClose, action } = data;
  const createList = useListStore((state) => state.createList);
  const updateList = useListStore((state) => state.updateList);

  const [searchParams, setSearchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  function manageData(event: React.SyntheticEvent) {
    event.preventDefault();

    const title: string = event.target["listTitle"].value.trim();
    const themeColor: string = event.target["color"].value;

    if (action === "addList") {
      if (!title) {
        console.error("Title is not provided");
        return;
      }

      const listInfo = { title, themeColor };
      createList(listInfo);
    }

    if (action === "updateList") {
      if (!listId) {
        console.error("List ID is not found");
        return;
      }

      const listInfo: { title?: string; themeColor: string } = { themeColor };

      if (title) listInfo.title = title;

      updateList(listId, listInfo);
    }

    onClose();
  }

  return (
    <div className={clsx(!isOpen ? styles.disable : styles.modalWrapper)}>
      <div className={styles.modal}>
        <form onSubmit={manageData}>
          <label htmlFor="listTitle">Name:</label>
          <input type="text" name="listTitle" id="listTitle" />

          <div>
            <p>Colour:</p>
            <input type="radio" name="color" id="red" value="red" />
            <input type="radio" name="color" id="orange" value="orange" />
            <input type="radio" name="color" id="yellow" value="yellow" />
            <input type="radio" name="color" id="green" value="green" />
            <input
              type="radio"
              name="color"
              id="blue"
              value="blue"
              defaultChecked
            />
            <input type="radio" name="color" id="purple" value="purple" />
          </div>

          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">OK</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
