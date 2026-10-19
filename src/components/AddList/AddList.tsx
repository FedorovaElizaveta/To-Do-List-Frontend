import styles from "./AddList.module.css";
import plusIcon from "../../images/plus-icon.png";

const AddList = () => {
  return (
    <button type="button" className={styles.addListBtn}>
      <img src={plusIcon} alt="add list icon" width={20} />
    </button>
  );
};

export default AddList;
