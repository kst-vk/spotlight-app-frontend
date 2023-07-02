import { useEffect } from "react";
import { getAllStreamers } from "../services/StreamerService";
import { Action } from "../utils/Enums";

export const useLoadStreamers = (dispatch: React.Dispatch<any>) => {
  useEffect(() => {
    const json = getAllStreamers();
    json
      .then((response) => {
        if (response.error)
          throw new Error(response.statusCode + " " + response.message);
        dispatch({ type: Action.SET_STREAMERS, streamers: response });
      })
      .catch((error) => {
        dispatch({
          type: Action.SHOW_ERROR,
          message: "Could not fetch the streamers. Error message: " + error,
        });
      });
  }, [dispatch]);
};
