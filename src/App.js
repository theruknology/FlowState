import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewSession from "./components/NewSession/NewSession";
import Settings from "./components/Settings/Settings";
import Stats from "./components/Stats/Stats";

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

  const [congratsMess, setCongratsMess] = useState(false);
  const [statsView, setStatsView] = useState(true);

  const pomRequestHandler = (data) => {
    setCongratsMess(false);
    setPomodoro(data);
    setTimerOn(true);
    setNewSessionModal(false);
  };

  const [settingsModal, setSettingsModal] = useState(false);

  // const stopBreakHandler = (timeCompleted) => {
  //   setTimerOn(false);
  //   dispatch({
  //     type: "ADD_SESSION",
  //     payload: {
  //       id: crypto.randomUUID(),
  //       name: pomodoro.title,
  //       date: new Date(),
  //       flair: "Break",
  //       duration: timeCompleted,
  //     },
  //   });
  // };

  const stopTimerHandler = (timeCompleted) => {
    const today = new Date();
    setTimerOn(false);
    dispatch({
      type: "ADD_SESSION",
      payload: {
        id: crypto.randomUUID(),
        name: pomodoro.title,
        date: today.toLocaleDateString(),
        flair: pomodoro.flair,
        duration: timeCompleted,
      },
    });
    setCongratsMess(true);
  };

  useEffect(() => {
    console.log("updating storages");
    const data = JSON.parse(localStorage.getItem("FLOWSTATE_sessions"));
    const config = JSON.parse(localStorage.getItem("FLOWSTATE_settings"));

    if (data !== null) {
      console.log("Found something");
      dispatch({ type: "UPDATE_SESSIONS", payload: data });
    }
    if (config !== null) {
      dispatch({ type: "UPDATE_SETTINGS", payload: config });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("FLOWSTATE_sessions", JSON.stringify(sessions));
  }, [sessions]);
  useEffect(() => {
    localStorage.setItem("FLOWSTATE_settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="app">
      {settingsModal && (
        <Settings
          onClose={() => {
            setSettingsModal(false);
          }}
        />
      )}
      {statsView && <Stats onClose={()=>{setStatsView(false)}}/>}
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
        congrats={congratsMess}
        settingsMod={() => {
          setSettingsModal(true);
        }}
        statsView = {() => {
          setStatsView(true)
        }}
      />
    </div>
  );
}
