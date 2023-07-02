import { createContext, useContext, useReducer } from "react";
import { AppContext, AppContextState, Streamer } from "../utils/Types";
import { Action } from "../utils/Enums";

export const getStreamerFromAppContext: any = (
  state: AppContextState,
  streamerId: string
) => {
  return state.streamers.find(
    (streamer) => String(streamerId) === String(streamer.id)
  );
};

function getStateAfterVoting(
  state: AppContextState,
  id: string,
  upvotes: number,
  downvotes: number
) {
  return {
    ...state,
    streamers: state.streamers.map((streamer: Streamer) => {
      const votes = streamer.votes;
      return String(streamer.id) === String(id)
        ? {
            ...streamer,
            votes: {
              upvotes: votes.upvotes + upvotes,
              downvotes: votes.downvotes + downvotes,
            },
          }
        : streamer;
    }),
  };
}

export const appContextReducer = (state: AppContextState, action: any) => {
    console.log('in reducer')
  switch (action.type) {
    case Action.SHOW_ERROR:
      return {
        ...state,
        showErrorModal: true,
        errorMessage: action.message,
      };
    case Action.HIDE_ERROR:
      return {
        ...state,
        showErrorModal: false,
      };
    case Action.SET_STREAMERS:
      return {
        ...state,
        streamers: action.streamers,
      };
    case Action.UPVOTE:
      return getStateAfterVoting(state, action.streamerId, 1, 0);
    case Action.DOWNVOTE:
      return getStateAfterVoting(state, action.streamerId, 0, 1);
    case Action.ADD_STREAMER:
      const currentStreamers = state.streamers;
      return {
        ...state,
        streamers: [...currentStreamers, action.streamer],
      };
    default:
      return state;
  }
};

export const useAppContextReducer = () =>
  useReducer(appContextReducer, {
    showErrorModal: false,
    errorMessage: "",
    streamers: [],
  });

export const AppContextInstance = createContext<AppContext>({
  appContextState: { showErrorModal: false, errorMessage: "", streamers: [] },
  appContextDispatch: () => {},
});

export const useAppContext = () => useContext(AppContextInstance);
