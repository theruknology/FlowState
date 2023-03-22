import React from "react";

const SessionPill = (props) => {
  return (
    <div className="flex justify-between font-Inter text-white w-full h-fit border border-gray-400 px-2 py-2 rounded-lg items-center">
      <div className="flex flex-col gap-4 font-medium text-left w-full">
        <p className="italic text-xs">{props.date}</p>
        <p>{props.name}</p>
        <p className="py-1 px-2 text-xs bg-gray-600 rounded-lg w-fit">
          {props.flair}
        </p>
        <button onClick={props.deleteSes} className="w-fit bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg self-end">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SessionPill;
