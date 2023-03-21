import { createStore } from "redux";

const initialState = {
  sessionsList: [
    {
      id: 1,
      name: "Sample Session",
      duration: 35,
      date: new Date(),
      flair: "Sample Flair",
    },
  ],
  settings: {
    flairs: [
      { id: 1, name: "Study" },
      { id: 2, name: "Work" },
      { id: 3, name: "Health" },
    ],
    goal: 120,
  },
};

const deleteSession = (id, list) => {
  return list.filter((ses) => ses.id !== id);
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      return {
        ...state,
        sessionsList: [action.payload, ...state.sessionsList],
      };
    case "DELETE_SESSION":
      return {
        sessionsList: deleteSession(action.payload, state.sessionsList),
      };
    case "SET_FLAIRS":
      return {
        ...state,
        settings: {
          ...state.settings,
          flairs: action.payload,
        },
      };
    default:
      return state;
  }
};

const store = createStore(sessionReducer);

export default store;
