import { createContext } from "react";
import { FormContextType } from "../utils/Types";

const FormContext = createContext<FormContextType>({
  setValue: (field: string, v: any) => {},
  value: (field: string) => 0,
  setDirty: (v: string) => {},
  isDirty: (field: string) => false,
  setInvalid: (field: string, v: any) => {},
});

export default FormContext;
