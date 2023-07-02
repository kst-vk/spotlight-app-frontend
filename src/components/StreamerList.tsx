import React, { useContext } from "react";
import { downvoteStreamer, upvoteStreamer } from "../services/StreamerService";
import { Link } from "react-router-dom";
import { Streamer } from "../utils/Types";
import "../styles/streamer-list.css";
import { AppContextInstance } from "../context/AppContext";
import { Action } from "../utils/Enums";

export default function StreamerList(props: { streamers: Streamer[] }) {
  const { appContextDispatch } = useContext(AppContextInstance);

  const detailsButton = (id: string) => {
    return (
      <Link to={`/details/${id}`} state={{ from: id }}>
        <button>Details</button>
      </Link>
    );
  };

  const upvoteButton = (id: string) => {
    return (
      <button
        onClick={() =>
          upvoteStreamer(id).catch((error) =>
            appContextDispatch({
              type: Action.SHOW_ERROR,
              message: "Could not upvote. Error: " + error,
            })
          )
        }
      >
        Upvote
      </button>
    );
  };

  const downvoteButton = (id: string) => {
    return (
      <button
        onClick={() =>
          downvoteStreamer(id).catch((error) =>
            appContextDispatch({
              type: Action.SHOW_ERROR,
              message: "Could not downvote. Error: " + error,
            })
          )
        }
      >
        Downvote
      </button>
    );
  };

  return (
    <table className="streamers">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Platform</th>
          <th>Downvotes</th>
          <th>Upvotes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.streamers.length > 0 ? (
          [...props.streamers].map((streamer) => {
            return (
              <tr key={streamer.id}>
                <td>{streamer.name}</td>
                <td>{streamer.description}</td>
                <td>{streamer.platform}</td>
                <td>{streamer.votes.downvotes}</td>
                <td>{streamer.votes.upvotes}</td>
                <td>
                  {upvoteButton(streamer.id!)}
                  <br />
                  {downvoteButton(streamer.id!)}
                  <br />
                  {detailsButton(streamer.id!)}
                </td>
              </tr>
            );
          })
        ) : (
          <tr></tr>
        )}
      </tbody>
    </table>
  );
}
