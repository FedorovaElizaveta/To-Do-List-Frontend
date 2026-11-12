import styles from "./HomePage.module.css";
import MyLists from "../../components/MyLists/MyLists.js";
import SelectedList from "../../components/SelectedList/SelectedList.js";

const HomePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <MyLists />

      <SelectedList />
    </div>
  );
};

export default HomePage;
