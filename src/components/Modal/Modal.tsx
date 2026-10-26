import styles from "./Modal.module.css";
import clsx from "clsx";
import { useListStore } from "../../zustand/store.ts";
import { useSearchParams } from "react-router-dom";

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
  const list = useListStore((state) => state.lists).find(
    (list) => list.id === listId,
  );

  function manageData(event) {
    event.preventDefault();

    const title: string = event.target["listTitle"].value.trim();
    const color: string = event.target["color"].value;

    const themeColor = color ? color : list ? list.themeColor : "blue";

    switch (action) {
      case "addList": {
        if (!title) {
          console.error("Title is not provided");
          return;
        }

        const listInfo = { title, themeColor };
        createList(listInfo);
        break;
      }
      case "updateList": {
        if (!listId) {
          console.error("List ID is not found");
          return;
        }

        const listInfo: { title?: string; themeColor: string } = { themeColor };

        if (title) listInfo.title = title;

        updateList(listId, listInfo);

        break;
      }
    }

    event.target.reset();
    onClose();
  }

  return (
    <div className={clsx(!isOpen ? styles.disable : styles.modalWrapper)}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {action === "addList" ? "New List" : `List Info`}
        </h2>

        <form onSubmit={manageData}>
          <div className={styles.nameInputWrapper}>
            <label htmlFor="listTitle">Name:</label>
            <input type="text" name="listTitle" id="listTitle" />
          </div>

          <div className={styles.radioWrapper}>
            <p>Colour:</p>
            <div className={styles.red}>
              <input type="radio" name="color" id="red" value="red" />
            </div>

            <div className={styles.yellow}>
              <input type="radio" name="color" id="orange" value="orange" />
            </div>

            <div className={styles.orange}>
              <input type="radio" name="color" id="yellow" value="yellow" />
            </div>

            <div className={styles.green}>
              <input type="radio" name="color" id="green" value="green" />
            </div>

            <div className={styles.blue}>
              <input type="radio" name="color" id="blue" value="blue" />
            </div>

            <div className={styles.purple}>
              <input type="radio" name="color" id="purple" value="purple" />
            </div>
          </div>

          <div className={styles.btnsWrapper}>
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
