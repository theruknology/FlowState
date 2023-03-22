import React from "react";
import Congrats from "../Congrats";
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
            <button onClick={props.settingsMod}>Settings</button>
            <button onClick={props.statsView}>Stats</button>
          </div>
        </Card>
      </div>

      {props.pomTimerOn && (
        <PomTimer
          title={props.pomData.title}
          flair={props.pomData.flair}
          // minutes={props.pomData.duration}
          minutes={1}
          stopReq={props.stopReq}
        />
      )}

      {props.congrats && <Congrats />}

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
