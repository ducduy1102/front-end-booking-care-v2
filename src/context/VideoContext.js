import React, { createContext, useReducer, useContext } from "react";

// Define action types
const actionTypes = {
  TOGGLE_PIP: "TOGGLE_PIP",
  SET_PIP: "SET_PIP",
};

// Initial state
const initialState = {
  // isPiP: JSON.parse(localStorage.getItem("isPiP")) || false,
  isPiP: JSON.parse(sessionStorage.getItem("isPiP")) || false,
};

// Reducer function
const videoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_PIP:
      return {
        ...state,
        isPiP: !state.isPiP,
      };
    case actionTypes.SET_PIP:
      return {
        ...state,
        isPiP: action.payload,
      };
    default:
      return state;
  }
};

// Create Context
const VideoContext = createContext();

// Provider Component
export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  useEffect(() => {
    const handleReload = () => {
      // localStorage.setItem("isPiP", null);
      sessionStorage.setItem("isPiP", null);
    };

    window.addEventListener("beforeunload", handleReload);
    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, []);

  // Action to toggle PiP
  const togglePiP = () => {
    const newPiPState = !state.isPiP;
    // localStorage.setItem("isPiP", JSON.stringify(newPiPState));
    sessionStorage.setItem("isPiP", JSON.stringify(newPiPState));
    dispatch({ type: actionTypes.TOGGLE_PIP });
  };

  // Action to set PiP
  const setPiP = (isPiP) => {
    // sessionStorage.setItem("isPiP", JSON.stringify(isPiP));
    dispatch({ type: actionTypes.SET_PIP, payload: isPiP });
  };

  return (
    <VideoContext.Provider value={{ state, togglePiP, setPiP }}>
      {children}
    </VideoContext.Provider>
  );
};

// Custom hook for using Video context
export const useVideo = () => {
  return useContext(VideoContext);
};
