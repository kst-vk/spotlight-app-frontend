import { useEffect } from "react";
import { Action } from "../utils/Enums";

export const useSseListener = (dispatch: React.Dispatch<any>) => {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/sse");
    eventSource.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "upvote":
          dispatch({
            type: Action.UPVOTE,
            streamerId: JSON.parse(event.data).streamer,
          });
          break;
        case "downvote":
          dispatch({
            type: Action.DOWNVOTE,
            streamerId: JSON.parse(event.data).streamer,
          });
          break;
        case "addStreamer":
          dispatch({
            type: Action.ADD_STREAMER,
            streamer: data.streamer,
          });
      }
    };
    return () => {
      eventSource.close();
    };
  }, [dispatch]);
};
