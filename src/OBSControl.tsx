import { State } from "./baseball/model/State";
import { DEFAULT_OBS_SOCKET } from "./default-state";
import { setObs } from "./service/obs/obs-client";

import Grid2 from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { publishCss, publishTickerUrl, refreshBrowsers } from "./service/obs/obs-api";
import { WBSC_OVERLAY_BOX } from "./css-generator/wbsc-overlay-box";
import { WBSC_OVERLAY_PLAYER } from "./css-generator/wbsc-overlay-players";
import { OVERLAY_SPONSORS } from "./css-generator/sponsor-overlay";
import { WBSC_OVERLAY_LINEUP } from "./css-generator/wbsc-overlay-lineup";

interface Props {
  state: State;

  handleChange: <T extends keyof State>(key: T, value: State[T]) => void;
}

export const OBSControl = ({ state, handleChange }: Props) => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={9}>
          <TextField fullWidth value={state.obsSocket || DEFAULT_OBS_SOCKET} placeholder={DEFAULT_OBS_SOCKET}
                     label="OBS Websocket URL"
                     onChange={(event) => handleChange("obsSocket", event.currentTarget.value)}
          />
        </Grid2>
        <Grid2 xs={3}>
          <Button
            fullWidth
            onClick={async () => {
              if (await setObs(state.obsSocket)) {
                handleChange("autoConnectObs", true);
              }
            }}
            variant="contained"
          >
            Connect to OBS
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>

        <Grid2 xs={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => publishCss(WBSC_OVERLAY_BOX(state), WBSC_OVERLAY_PLAYER(state), OVERLAY_SPONSORS(state), WBSC_OVERLAY_LINEUP(state))}>Publish
            CSS</Button>
        </Grid2>
        <Grid2 xs={4}>
          <Button

            fullWidth
            variant="contained"
            onClick={() => publishTickerUrl(state.tickerUrl)}>Publish Ticker URL</Button>
        </Grid2>

        <Grid2 xs={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => refreshBrowsers()}>Refresh Browsers</Button>
        </Grid2>
      </Grid2>
    </>
  );
};
