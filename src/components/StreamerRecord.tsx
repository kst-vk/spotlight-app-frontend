import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AppContextInstance,
  getStreamerFromAppContext,
} from "../context/AppContext";
//import { getStreamer } from '../services/StreamerService';

export default function StreamerRecord() {
  const navigate = useNavigate();
  const params = useParams();
  const { appContextState } = useContext(AppContextInstance);
  const [streamer, setStreamer] = useState({
    name: "",
    description: "",
    platform: "",
  });

  useEffect(() => {
    //const streamer = getStreamer(params.id); <-- Here I could make use of GET /streamer/[streamerId]: endpoint but I decided to use context to avoid unnecessary requests since retrieved data is redundant
    const streamer = getStreamerFromAppContext(appContextState, params.id);
    setStreamer(streamer);
  }, [appContextState, params.id]);

  return (
    <div
      style={{
        backgroundColor: "#444453",
        borderRadius: "25px",
        padding: "0 5vw",
      }}
    >
      <button onClick={() => navigate(-1)}>Back</button>
      <img
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
        alt="Streamer avatar"
      ></img>
      <h3>Name</h3>
      <p>{streamer ? streamer.name : ""}</p>
      <h3>Description</h3>
      <p>{streamer ? streamer.description : ""}</p>
      <h3>Platform</h3>
      <p>{streamer ? streamer.platform : ""}</p>
    </div>
  );
}
