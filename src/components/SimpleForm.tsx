import { useCallback, useEffect, useState } from "react";
import FormContext from "../context/FormContext";
import "../styles/simple-form.css";

const SimpleForm = (props: {
  children: any;
  value: any;
  onChange: Function;
  onValid: Function;
}) => {
  const [values, setValues] = useState(props.value || {});
  const [dirtyFields, setDirtyFields] = useState({});
  const [invalidFields, setInvalidFields] = useState<{ [index: string]: any }>(
    {}
  );
  const { children, value, onChange, onValid } = props;

  useEffect(() => {
    setValues(value || {});
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [onChange, values]);

  useEffect(() => {
    if (onValid) {
      onValid(
        Object.keys(invalidFields).every((i: string) => !invalidFields[i]),
        invalidFields
      );
    }
  }, [onValid, invalidFields]);

  const setValue = useCallback(
    (field: string, v: any) =>
      setValues((vs: any) => {
        return { ...vs, [field]: v };
      }),
    [setValues]
  );
  const getValue = useCallback((field: any) => values[field], [values]);
  const setDirty = useCallback(
    (field: string) => setDirtyFields((df) => ({ ...df, [field]: true })),
    [setDirtyFields]
  );
  const getDirty = useCallback(
    (field: string) => Object.keys(dirtyFields).includes(field),
    [dirtyFields]
  );
  const setInvalid = useCallback(
    (field: string, error: string) => {
      setInvalidFields((i) => ({
        ...i,
        [field]: error ? error : undefined,
      }));
    },
    [setInvalidFields]
  );
  const form = {
    setValue: setValue,
    value: getValue,
    setDirty: setDirty,
    isDirty: getDirty,
    setInvalid: setInvalid,
  };

  return (
    <div className="SimpleForm-container">
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </div>
  );
};

export default SimpleForm;
