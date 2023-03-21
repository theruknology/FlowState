import React, { useEffect, useState } from "react";

import styles from "./PomTimer.module.css";

const PomTimer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(props.minutes);
  const [timerStop, setTimerStop] = useState(false);
  const [paused, setPaused] = useState(false);

  const tick = () => {
    setSeconds((prev) => {
      if (prev === 0) {
        setMinutes((prevm) => {
          if (prevm !== 0) {
            return prevm - 1;
          } else {
            setTimerStop(true);
            setSeconds(0);
            console.log("timer stop called");
            return props.minutes;
          }
        });

        return 59;
      }
      return prev - 1;
    });
  };

  const toggleTimer = () => {
    setPaused((prev) => !prev);
  };

  const stopTimer = () => {
    setTimerStop(false);
    setPaused(true);
    setMinutes(props.minutes);
    setSeconds(0);

    const remaning = props.minutes - minutes;

    props.stopReq(remaning);
  };

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    if (timerStop === true) {
      clearInterval(interval);
    }
    if (paused === true) {
      clearInterval(interval);
    }
    console.log("effect");

    return () => {
      console.log("garbage collection");
      clearInterval(interval);
    };
  }, [timerStop, paused]);

  return (
    <div className={styles.timer}>
      <h3>{props.title}</h3>
      <p>{props.flair}</p>
      <div className={styles.ctime}>
        <h2>{minutes < 10 ? "0" + minutes : minutes}: </h2>
        <h2>{seconds < 10 ? "0" + seconds : seconds}</h2>
      </div>
      {/* <button
        className="bg-blue-700 text-white py-2 px-4 rounded-xl ml-4 text-sm mb-4"
        onClick={toggleTimer}
      >
        {paused ? "Play" : "Pause"}
      </button> */}
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

export default PomTimer;
