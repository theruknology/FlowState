import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./NewSession.module.css";

const NewForm = (props) => {
  const flairsList = useSelector((state) => state.settings.flairs);

  const [title, setTitle] = useState("");
  const [flair, setFlair] = useState("");
  const [duration, setDuration] = useState(25);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFlairChange = (e) => {
    setFlair(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  useEffect(() => {
    setFlair(flairsList[0].name);
  }, [flairsList]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setErrorMessage("");
    if (title.trim() === "") {
      setErrorMessage((prev) => prev + " Enter Valid Title \n");
    } else {
      props.onSubmit({
        title: title,
        duration: duration,
        flair: flair,
      });
    }
  };

  return (
    <form className={styles.newForm} onSubmit={formSubmitHandler}>
      <div>
        <label>Title</label>
        <input
          type="text"
          className="px-2 py-1"
          onChange={handleTitleChange}
          value={title}
        />
      </div>
      <div>
        <label>Flair</label>
        <select
          id="flair-select"
          value={flair}
          onChange={handleFlairChange}
          className="w-full bg-[#494949] py-1 px-2 rounded-lg"
        >
          {flairsList.map((opt) => (
            <option key={opt.id} value={opt.name}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Duration</label>
        <select
          id="dur-select"
          value={duration}
          onChange={handleDurationChange}
          className="w-full bg-[#494949] py-1 px-2 rounded-lg"
        >
          <option key={1} value={25}>
            25 Minutes
          </option>
          <option key={2} value={40}>
            40 Minutes
          </option>
          <option key={3} value={60}>
            1 Hour
          </option>
        </select>
      </div>

      {errorMessage !== "" && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative self-center"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      )}
      <button
        type="submit"
        className="bg-[#494949] self-center rounded-lg mt-4"
      >
        Start
      </button>
      <button
        className="underline self-center"
        type="reset"
        onClick={props.onClose}
      >
        Cancel
      </button>
    </form>
  );
};

export default NewForm;
