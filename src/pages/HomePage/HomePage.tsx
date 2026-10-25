import styles from "./HomePage.module.css";
import { useEffect } from "react";
import { useListStore } from "../../zustand/store.ts";
import MyLists from "../../components/MyLists/MyLists.js";
import SelectedList from "../../components/SelectedList/SelectedList.js";

const HomePage = () => {
  const getLists = useListStore((state) => state.getLists);

  useEffect(() => {
    getLists();
  }, [getLists]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.myListsWrapper}>
        <MyLists />
      </div>

      <SelectedList />
    </div>
  );
};

export default HomePage;
