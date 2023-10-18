import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
import "./baseball/index.css";
import { loadState } from "./state";
import { setObs } from "./service/obs/obs-client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { App } from "./App";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4-U1Z4irYRnYk6S2wGjOUOCTW-gkTNH4",
  authDomain: "hardbulls-livestream.firebaseapp.com",
  databaseURL: "https://hardbulls-livestream-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hardbulls-livestream",
  storageBucket: "hardbulls-livestream.appspot.com",
  messagingSenderId: "672919965109",
  appId: "1:672919965109:web:6efa9ea69eea842b131dfc",
  persistence: browserLocalPersistence
};

initializeApp(firebaseConfig);

const defaultTheme = createTheme({
  components: {
    MuiInput: {
      defaultProps: {
        fullWidth: true
      }
    },
  }
});

const rootElement = document.createElement("_scoreboard_root");
const root = ReactDOM.createRoot(
  rootElement
);

document.body.prepend(rootElement);


(async () => {
  try {
    const auth = getAuth();
    await auth.setPersistence(browserLocalPersistence);

    const initialState = await loadState();

    if (initialState.autoConnectObs) {
      await setObs(initialState.obsSocket);
    }

    root.render(
      <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
          <App initialState={initialState} />
        </ThemeProvider>
      </React.StrictMode>
    );
  } catch (err) {
    console.error(err);
  }
})();

