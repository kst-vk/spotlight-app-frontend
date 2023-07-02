import React, { useMemo } from "react";
import "./App.css";
import { AppContextInstance, useAppContextReducer } from "./context/AppContext";
import ErrorModal from "./components/ErrorModal";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import StreamerRecord from "./components/StreamerRecord";
import { useSseListener } from "./hooks/useSseListener";
import { useLoadStreamers } from "./hooks/useLoadStreamers";
import { streamerServerUrl } from "./services/StreamerService";
function App() {
  const [appContextState, appContextDispatch] = useAppContextReducer();
  const contextValue = useMemo(() => {
    return { appContextState, appContextDispatch };
  }, [appContextState, appContextDispatch]);

  useLoadStreamers(contextValue.appContextDispatch);

  useSseListener(contextValue.appContextDispatch, streamerServerUrl);

  return (
    <div className="App">
      <header className="App-header">
        <AppContextInstance.Provider
          value={{ appContextState, appContextDispatch }}
        >
          <ErrorModal />
          <BrowserRouter>
            <Routes>
              <Route index element={<MainPage />} />
              <Route path="details/:id" element={<StreamerRecord />} />
            </Routes>
          </BrowserRouter>
        </AppContextInstance.Provider>
      </header>
    </div>
  );
}

export default App;
