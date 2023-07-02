export type AppContextState = {
  showErrorModal: boolean;
  errorMessage: string;
  streamers: Streamer[];
};
export type AppContext = {
  appContextState: AppContextState;
  appContextDispatch: any;
};

export type FormContextType = {
  setValue: (field: any, v: any) => void;
  value: (field: any) => any;
  setDirty: (v: any) => void;
  isDirty: (field: any) => boolean;
  setInvalid: (field: any, v: any) => void;
};

export type Streamer = {
  id?: string;
  name: string;
  description: string;
  platform: string;
  votes: {
    downvotes: number;
    upvotes: number;
  };
};
