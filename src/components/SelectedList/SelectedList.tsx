// import styles from "./List.module.css";
import { useListStore } from "../../zustand/store.ts";

const SelectedList = () => {
  const lists = useListStore((state) => state.lists);
  const selectedListId = useListStore((state) => state.selectedListId);
  const selectedList = lists.find((list) => list.id === selectedListId);

  return (
    <div>
      {selectedList ? <div>{selectedList.title}</div> : <div>Select List</div>}
    </div>
  );
};

export default SelectedList;
