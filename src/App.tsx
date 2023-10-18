import { useEffect, useState } from "react";
import { State } from "./baseball/model/State";
import CompleteView from "./CompleteView.tsx";
import { Login } from "./auth/Login";
import { browserLocalPersistence, getAuth, signOut, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Logout } from "./auth/Logout";
import { AppMode } from "./baseball/model/AppMode";
import { ModeSelect } from "./ModeSelect";
import RemoteView from "./RemoteView";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { Copyright } from "./layout/Copyright";
import { saveState } from "./state";
import { StatusBar } from "./StatusBar.tsx";
import { getObs } from "./service/obs/obs-client.ts";
import Box from "@mui/material/Box";


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

interface Props {
  initialState: State;
}

export function App({ initialState }: Props) {
  const [state, setState] = useState<State>(initialState);
  const [isObsConnected, setIsObsConnected] = useState<boolean>(false);

  const user = getAuth().currentUser;
  const obs = getObs();

  useEffect(() => {
    obs?.on("ConnectionOpened", () => {
      setIsObsConnected(true);
    });

    obs?.on("ConnectionClosed", () => {
      setIsObsConnected(false);
    });

    obs?.on("ConnectionError", () => {
      setIsObsConnected(false);
    });
  }, [obs, setIsObsConnected]);

  useEffect(() => {
    saveState({
      ...state
    });
  }, [state]);

  const handleLogin = (user: User) => {
    setState({
      ...state,
      userId: user.uid,
      login: true
    });
  };

  const handleSkipLogin = () => {
    setState({
      ...state,
      userId: undefined,
      login: false
    });
  };

  const handleLogout = async () => {
    const auth = getAuth();

    if (state.userId) {
      await signOut(auth);
    }

    setState({
      ...state,
      userId: undefined,
      login: undefined
    });
  };

  if (state.login === undefined || (!user && state.login)) {
    return (
      <Login handleLogin={handleLogin} handleSkipLogin={handleSkipLogin} />
    );
  }

  if (!state.appMode) {
    return (
      <ModeSelect handleModeSelect={(mode) => setState({ ...state, appMode: mode })} />
    );
  }

  const BottomSection = () => {
    return (
      <div>
        <Box sx={{p: 1, borderTop: 1, borderBottom: 1, borderColor: "divider", }}>
          <StatusBar online={state.login || false} obsConnected={isObsConnected} />
        </Box>
        <Grid2 container spacing={2} sx={{ p: 1 }}>
          <Grid2 xs={6}>
            <Button
              fullWidth
              onClick={() => setState({ ...state, appMode: undefined })}
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Switch Mode
            </Button>
          </Grid2>
          <Grid2 xs={6}>
            <Logout handleLogout={handleLogout} />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <Copyright />
          </Grid2>
        </Grid2>
      </div>
    );
  };

  if (state.appMode === AppMode.FULL) {
    return (
      <>
        <CompleteView state={state} setState={(updatedState) => setState(updatedState)} />
        <BottomSection />
      </>
    );
  }


  return (
    <>
      <RemoteView state={state} setState={(updatedState) => setState(updatedState)} />
      <BottomSection />
    </>
  );
}
