import React, { useEffect, useState } from "react";

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

  const resetTimer = () => {
    setTimerStop(false);
    setPaused(true);
    setMinutes(props.minutes);
    setSeconds(0);
  }

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
    <>
      <div className="m-4 ring-4 ring-blue-300 rounded-lg w-fit p-4 flex">
        <h1 className="font-bold text-xl">{minutes}: </h1>
        <h1 className="font-bold text-xl">{seconds}</h1>
      </div>
      <button
        className="bg-blue-700 text-white py-2 px-4 rounded-xl ml-4 text-sm mb-4"
        onClick={toggleTimer}
      >
        {paused ? "Play" : "Pause"}
      </button>
      <button
        className="bg-blue-700 text-white py-2 px-4 rounded-xl ml-4 text-sm mb-4"
        onClick={resetTimer}
      >
      Reset
      </button>
    </>
  );
};

export default PomTimer;