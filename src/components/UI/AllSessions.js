import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionPill from "./SessionPill";
import styles from "./UI.module.css";

const AllSessions = () => {
  const allSessions = useSelector((state) => state.sessionsList);
  const dispatch = useDispatch();

  const deleteSesHandler = (id) => {
    dispatch({ type: "DELETE_SESSION", payload: id });
  };

  return (
    <div className={`${styles.allSessions} h-fit`}>
      <h2>All Sessions</h2>
      <ul className="flex flex-col gap-2 ">
        {allSessions.map((itm) => (
          <SessionPill
            key={itm.id}
            name={itm.name}
            date={itm.date}
            flair={itm.flair}
            deleteSes={() => {
              deleteSesHandler(itm.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default AllSessions;
