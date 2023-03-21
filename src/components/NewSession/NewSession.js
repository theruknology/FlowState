import React from "react";

import styles from "./NewSession.module.css";
import PromptModal from "../UI/Modals/Modal";
import NewForm from "./NewForm";

const NewSession = (props) => {
  const newRequestHandler = (data) => {
    props.newReq(data);
  };

  return (
    <PromptModal>
      <div className={styles.newSessionModal}>
        <h2>New Session</h2>
        <NewForm onSubmit={newRequestHandler} onClose={props.onClose} />
      </div>
    </PromptModal>
  );
};

export default NewSession;
