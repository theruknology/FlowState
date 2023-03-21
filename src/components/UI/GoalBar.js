import React from "react";
import styles from "./GoalBar.module.css";

const GoalBar = (props) => {
  return (
    <div className={styles.outer}>
      <div
        className={styles.inner}
        style={{ width: props.progress + "%" }}
      ></div>
    </div>
  );
};

export default GoalBar;
