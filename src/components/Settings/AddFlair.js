import React, { useState } from "react";

const AddFlair = (props) => {
  const [name, setName] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (name.trim() !== "") {
      props.onSubmit(name);
      setName("");
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex flex-col gap-2 p-4 border rounded-lg"
    >
      <label>Name</label>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        type="text"
        className="p-2"
      />
      <button
        type="submit"
        className="w-fit py-2 px-4 underline bg-[rgb(0,153,255)] rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default AddFlair;
