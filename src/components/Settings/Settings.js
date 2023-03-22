import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromptModal from "../UI/Modals/Modal";
import AddFlair from "./AddFlair";

const Settings = (props) => {
  const [addOpt, setAddOpt] = useState(false);
  const availableFlairs = useSelector((state) => state.settings.flairs);
  const dailyGoal = useSelector((state) => state.settings.goal);
  const [goalSetting, setGoalSetting] = useState(dailyGoal);
  const dispatch = useDispatch();

  const addFlairHandler = (name) => {
    dispatch({
      type: "ADD_FLAIR",
      payload: {
        id: crypto.randomUUID(),
        name: name,
      },
    });
  };

  const deleteFlairHandler = (id) => {
    dispatch({ type: "DELETE_FLAIR", payload: id });
  };

  const setGoalHandler = () => {
    dispatch({ type: "SET_GOAL", payload: goalSetting });
  };

  return (
    <PromptModal>
      <div className="w-100% h-fit flex flex-col gap-2 text-white font-Inter items-center text-center">
        <h2 className="font-medium text-[1.3rem] mb-4">Settings</h2>

        <h3 className="mb-2 underline">Daily Goal:</h3>
        <div className="w-fit flex gap-1">
          <select
            className="w-fit bg-[#494949] py-1 px-2 rounded-lg"
            value={goalSetting}
            onChange={(e) => setGoalSetting(e.target.value)}
          >
            <option value={60}>1 Hour</option>
            <option value={90}>1.5 Hour</option>
            <option value={120}>2 Hours</option>
            <option value={150}>2.5 Hour</option>
            <option value={180}>3 Hour</option>
          </select>
          <button
            className="bg-[rgb(0,153,255)] p-2 rounded-md"
            onClick={setGoalHandler}
          >
            Set
          </button>
        </div>

        <h3 className="mb-2 underline">Flairs:</h3>
        <ul className="flex flex-col gap-2 w-fit">
          {availableFlairs.map((itm) => (
            <li key={itm.id} className="flex gap-4 items-center">
              <button
                onClick={() => {
                  deleteFlairHandler(itm.id);
                }}
                className="bg-gray-600 px-2 py-1 rounded-md"
              >
                -
              </button>
              <p>{itm.name}</p>
            </li>
          ))}
        </ul>
        {addOpt && <AddFlair onSubmit={addFlairHandler} />}
        {!addOpt && (
          <button
            onClick={() => {
              setAddOpt(true);
            }}
            className="w-fit py-2 px-4 underline bg-[rgb(0,153,255)] rounded-md"
          >
            Add Flair
          </button>
        )}
        <button className="underline w-fit" onClick={props.onClose}>
          Close
        </button>
      </div>
    </PromptModal>
  );
};

export default Settings;
