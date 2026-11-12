import "../../App.css";
import styles from "./ListModalWindow.module.css";
import { useListStore } from "../../zustand/store.ts";
import { useSearchParams } from "react-router-dom";
import type { SubmitEvent } from "react";

interface Props {
  cancelFn(): void;
  listName?: string;
  action: "addList" | "updateList";
}

const ListModalWindow: React.FC<Props> = (props) => {
  const { cancelFn, listName, action } = props;
  const createList = useListStore((state) => state.createList);
  const updateList = useListStore((state) => state.updateList);
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");
  const list = useListStore((state) => state.lists).find(
    (list) => list.id === listId,
  );

  const manageData = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title: string = event.target["listTitle"].value.trim();
    const color: string = event.target["color"].value;

    const themeColor = color ? color : list ? list.themeColor : "blue";

    switch (action) {
      case "addList": {
        if (!title) throw new Error("Title is not provided");

        const listInfo = { title, themeColor };
        createList(listInfo);
        break;
      }
      case "updateList": {
        if (!listId) throw new Error("List ID is not found");

        const listInfo: { title?: string; themeColor: string } = { themeColor };

        if (title) listInfo.title = title;

        updateList(listId, listInfo);

        break;
      }
    }

    event.target.reset();
    cancelFn();
  };

  return (
    <div className={styles.modal}>
      <h2 className={styles.modalTitle}>
        {action === "addList" ? "New List" : `"${listName}" Info`}
      </h2>

      <form onSubmit={manageData}>
        <div className={styles.nameInputWrapper}>
          <label htmlFor="listTitle">Name:</label>
          <input type="text" name="listTitle" id="listTitle" />
        </div>

        <div className={styles.radioWrapper}>
          <p>Colour:</p>
          <div className="redBackground">
            <input type="radio" name="color" id="red" value="red" />
          </div>

          <div className="orangeBackground">
            <input type="radio" name="color" id="orange" value="orange" />
          </div>

          <div className="yellowBackground">
            <input type="radio" name="color" id="yellow" value="yellow" />
          </div>

          <div className="greenBackground">
            <input type="radio" name="color" id="green" value="green" />
          </div>

          <div className="blueBackground">
            <input type="radio" name="color" id="blue" value="blue" />
          </div>

          <div className="purpleBackground">
            <input type="radio" name="color" id="purple" value="purple" />
          </div>
        </div>

        <div className={styles.formControls}>
          <button type="button" onClick={cancelFn}>
            Close
          </button>
          <button type="submit">OK</button>
        </div>
      </form>
    </div>
  );
};

export default ListModalWindow;
