import React from "react";
import { useAppContext } from "../context/AppContext";
import "../styles/modal.css";
import { Action } from "../utils/Enums";
export default function ErrorModal() {
  const { appContextState, appContextDispatch } = useAppContext();

  return (
    <div
      className={
        appContextState.showErrorModal
          ? "modal display-block"
          : "modal display-none"
      }
    >
      <section className="modal-main">
        <p>{appContextState.errorMessage}</p>
        <button
          type="button"
          onClick={() => appContextDispatch({ type: Action.HIDE_ERROR })}
        >
          Close
        </button>
      </section>
    </div>
  );
}
