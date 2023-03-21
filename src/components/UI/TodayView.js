import React from "react";
import styles from "./UI.module.css";
import { useSelector } from "react-redux";
import GoalBar from "./GoalBar";

const TodayView = () => {
  const toDate = new Date();
  const todaysSessions = useSelector((state) =>
    state.sessionsList.filter((ses) => ses.date === toDate)
  );
  const dailyGoal = useSelector((state) => state.settings.goal);
  const todayTime = (() => {
    let x = 0;
    for (let i of todaysSessions) {
      x += i.duration;
    }
    return x;
  })();

  const progress = todayTime < dailyGoal ? (todayTime / dailyGoal) * 100 : 100;

  return (
    <div className={styles.today}>
      <h2>Today</h2>
      <p>
        <span className={styles.sesToday}>{todaysSessions.length}</span>{" "}
        Sessions
      </p>
      <p>
        <span className={styles.sesToday}>{todayTime}</span> Minutes
      </p>
      <h2>Daily Goal</h2>
      <GoalBar progress={progress} />
    </div>
  );
};

export default TodayView;
