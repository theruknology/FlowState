import React from "react";
import styles from "./UI.module.css"

const Card = (props) => {
  return (
    <div className={ `${styles.card} px-6 py-4` }>
      {props.children}
    </div>
  );
};

export default Card;
