import React, { useCallback, useContext, useState } from "react";
import InputField from "./InputField";
import SimpleForm from "./SimpleForm";
import { addStreamer } from "../services/StreamerService";
import { AppContextInstance } from "../context/AppContext";
import { Action } from "../utils/Enums";
export default function SubmissionForm() {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    platform: "",
    votes: {
      downvotes: 0,
      upvotes: 0,
    },
  });

  const { appContextDispatch } = useContext(AppContextInstance);

  const [valid, setValid] = useState(false);

  const required = useCallback(
    (v: string) => (v ? null : "Field required"),
    []
  );

  const onSubmit = useCallback(() => {
    addStreamer(formFields).catch((error) =>
      appContextDispatch({
        type: Action.SHOW_ERROR,
        message: "Could not add a streamer. Error: " + error,
      })
    );
  }, [appContextDispatch, formFields]);

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <SimpleForm
        value={formFields}
        onChange={setFormFields}
        onValid={(v: any) => {
          setValid(v);
        }}
      >
        <InputField
          name="name"
          type="text"
          onValidate={(v: string) =>
            !v || v.length < 3 ? "Name is too short!" : null
          }
        />

        <InputField name="description" type="text" onValidate={required} />

        <InputField
          name="platform"
          type="dropdown"
          options={["Twitch", "YouTube", "TikTok", "Kick", "Rumble"]}
          onValidate={required}
        />
        <button
          onClick={onSubmit}
          disabled={!valid}
          style={{ fontSize: "x-large" }}
        >
          Add streamer
        </button>
      </SimpleForm>
      <p>^ Fields required</p>
    </div>
  );
}
