import React, { useContext } from "react";
import "../styles/modal.css";
import SubmissionForm from "./SubmissionForm";
import StreamerList from "./StreamerList";
import { AppContextInstance } from "../context/AppContext";
export default function MainPage() {
  const { appContextState } = useContext(AppContextInstance);
  return (
    <div>
      <SubmissionForm></SubmissionForm>
      <StreamerList streamers={appContextState.streamers} />
    </div>
  );
}
