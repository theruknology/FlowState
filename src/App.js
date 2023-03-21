import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewSession from "./components/NewSession/NewSession";

import Dashboard from "./components/UI/Dashboard";
import PromptModal from "./components/UI/Modals/Modal";
import "./index.css";

export default function App() {
  const [timerOn, setTimerOn] = useState(false);
  const [pomodoro, setPomodoro] = useState();
  const [newSessionModal, setNewSessionModal] = useState(false);
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.sessionsList);
  const settings = useSelector((state) => state.settings);

  const pomRequestHandler = (data) => {
    console.log(data);
    setPomodoro(data);
    setTimerOn(true);
    setNewSessionModal(false);
  };

  const stopTimerHandler = (timeCompleted) => {
    setTimerOn(false);
    dispatch({
      type: "ADD_SESSION",
      payload: {
        id: crypto.randomUUID(),
        name: pomodoro.title,
        date: new Date(),
        flair: pomodoro.flair,
        duration: timeCompleted,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem("FLOWSTATE_sessions", JSON.stringify(sessions));
  }, [sessions]);
  useEffect(() => {
    localStorage.setItem("FLOWSTATE_settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="app">
      {newSessionModal && (
        <NewSession
          newReq={pomRequestHandler}
          onClose={() => {
            setNewSessionModal(false);
          }}
        />
      )}
      <Dashboard
        newSes={() => {
          setNewSessionModal(true);
        }}
        pomTimerOn={timerOn}
        pomData={pomodoro}
        stopReq={stopTimerHandler}
      />
    </div>
  );
}
