import React from "react";
import PomTimer from "../Pomodoro/PomTImer";
import AllSessions from "./AllSessions";
import Card from "./Card";
import TodayView from "./TodayView";
import styles from "./UI.module.css";

const Dashboard = (props) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>
          Flow<span className={styles.titleSlice}>State</span>
        </h1>
        <Card>
          <div className={styles.nav}>
            <button>Settings</button>
            <button>Stats</button>
          </div>
        </Card>
      </div>

      {props.pomTimerOn && (
        <PomTimer
          title={props.pomData.title}
          flair={props.pomData.flair}
          minutes={props.pomData.duration}
          stopReq={props.stopReq}
        />
      )}

      <div className={styles.UIGrid}>
        {!props.pomTimerOn && (
          <>
            <Card>
              <button onClick={props.newSes}>+ New Focus Session</button>
            </Card>
            <Card>
              <button>+ New Break Session</button>
            </Card>
          </>
        )}
        <Card>
          <TodayView />
        </Card>
        <Card>
          <AllSessions />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
