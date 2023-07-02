import { useContext, useEffect, useState } from "react";
import FormContext from "../context/FormContext";
import "../styles/input-field.css";

const splitCamelCase = (s: string) =>
  s
    .replace(/([a-z0-9])([A-Z0-9])/g, "$1 $2")
    .replace(/^([a-z])/, (x: string) => x.toUpperCase());

type InputFieldProps = {
  name: string;
  label?: string;
  onValidate: (arg0: any) => any;
  [x: string]: any;
};

const InputField = (props: InputFieldProps) => {
  const form = useContext(FormContext);

  const [error, setError] = useState("");

  const { name, label, onValidate, ...otherProps } = props;

  let value = form.value && form.value(name);

  useEffect(() => {
    if (onValidate) {
      setError(onValidate(value));
    }
  }, [onValidate, value]);

  const setInvalid = form.setInvalid;
  useEffect(() => {
    if (setInvalid) {
      setInvalid(name, error);
    }
  }, [setInvalid, name, error]);

  const dropdown = () => (
    <select
      id={name}
      onBlur={() => form.setDirty(name)}
      value={value || ""}
      onChange={(event) => {
        form.setValue(name, event.target.value);
      }}
      {...otherProps}
    >
      <option hidden> -- select an option -- </option>
      {props.options.map((option: string) => {
        return <option key={option}>{option}</option>;
      })}
    </select>
  );

  const input = () => (
    <input
      id={name}
      onBlur={() => form.setDirty(name)}
      value={value || ""}
      onChange={(event) => {
        form.setValue(name, event.target.value);
      }}
      {...otherProps}
    />
  );

  return (
    <div className="InputField">
      <label htmlFor={name}>{label || splitCamelCase(name)}:</label>
      {props.type === "dropdown" ? dropdown() : input()}
      <div className="InputField-error">
        {form.isDirty(name) && error ? error : <>&nbsp;</>}
      </div>
    </div>
  );
};

export default InputField;
