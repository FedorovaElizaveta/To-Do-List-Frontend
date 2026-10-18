import { useEffect } from "react";
import { useListStore } from "../../zustand/store.js";
import type { State } from "../../types/index.js";
import ToDoList from "../../components/ToDoList/ToDoList.js";

const HomePage = () => {
  const getLists = useListStore((state: State) => state.getLists);

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      <ToDoList />
    </div>
  );
};

export default HomePage;
