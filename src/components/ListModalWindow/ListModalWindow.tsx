import "../../App.css";
import styles from "./ListModalWindow.module.css";
import { useListStore } from "../../zustand/store.ts";
import { useSearchParams } from "react-router-dom";
import type { FC, SubmitEvent } from "react";

interface Props {
  cancelFn(): void;
  listName?: string;
  action: "addList" | "updateList";
}

const ListModalWindow: FC<Props> = ({ cancelFn, listName, action }) => {
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
        {action === "addList" ? (
          "New List"
        ) : (
          <>
            "<div className={styles.listName}>{listName}</div>" Info
          </>
        )}
      </h2>

      <form onSubmit={manageData}>
        <div className={styles.nameInputWrapper}>
          <label htmlFor="listTitle">Name:</label>
          <input type="text" name="listTitle" id="listTitle" />
        </div>

        <div className={styles.radioListWrapper}>
          <p>Colour:</p>
          <ul className={styles.radioList}>
            <li className="redBackground">
              <input type="radio" name="color" id="red" value="red" />
            </li>

            <li className="orangeBackground">
              <input type="radio" name="color" id="orange" value="orange" />
            </li>

            <li className="yellowBackground">
              <input type="radio" name="color" id="yellow" value="yellow" />
            </li>

            <li className="greenBackground">
              <input type="radio" name="color" id="green" value="green" />
            </li>

            <li className="lightblueBackground">
              <input
                type="radio"
                name="color"
                id="lightblue"
                value="lightblue"
              />
            </li>

            <li className="blueBackground">
              <input type="radio" name="color" id="blue" value="blue" />
            </li>

            <li className="purpleBackground">
              <input type="radio" name="color" id="purple" value="purple" />
            </li>

            <li className="coralBackground">
              <input type="radio" name="color" id="purple" value="coral" />
            </li>

            <li className="pinkBackground">
              <input type="radio" name="color" id="purple" value="pink" />
            </li>

            <li className="brownBackground">
              <input type="radio" name="color" id="purple" value="brown" />
            </li>

            <li className="greyBackground">
              <input type="radio" name="color" id="purple" value="grey" />
            </li>

            <li className="beigeBackground">
              <input type="radio" name="color" id="purple" value="beige" />
            </li>
          </ul>
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
