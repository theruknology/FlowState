import { createStore } from "redux";

const initialState = {
  sessionsList: [
    {
      id: 1,
      name: "Sample Session",
      duration: 35,
      date: "3/22/2023",
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
        ...state,
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
    case "ADD_FLAIR":
      return {
        ...state,
        settings: {
          ...state.settings,
          flairs: [action.payload, ...state.settings.flairs],
        },
      };
    case "DELETE_FLAIR":
      return {
        ...state,
        settings: {
          ...state.settings,
          flairs: deleteSession(action.payload, state.settings.flairs),
        },
      };

    case "UPDATE_SESSIONS":
      return {
        ...state,
        sessionsList: [...action.payload],
      };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...action.payload },
      };
    case "SET_GOAL":
      return {
        ...state,
        settings: { ...state.settings, goal: action.payload },
      };
    default:
      return state;
  }
};

const store = createStore(sessionReducer);

export default store;
