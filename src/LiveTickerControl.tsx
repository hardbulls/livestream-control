import { State } from "./baseball/model/State";
import Grid2 from "@mui/material/Unstable_Grid2";

import { FormControl, FormControlLabel, Input, InputLabel, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
  state: State;

  handleChange: <T extends keyof State>(key: T, value: State[T]) => void;
}

export const LiveTickerControl = ({ state, handleChange }: Props) => {

  return (

    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={4}>
          <FormControlLabel
            control={
              <Switch checked={!state.displayLineupStats}
                      onChange={() => handleChange("displayLineupStats", !state.displayLineupStats)} />
            }
            label="Show Lineup Stats"
          />

        </Grid2>

        <Grid2 xs={4}>
          <TextField fullWidth value={state.homeTeamId} label="Home Team ID"
                     onChange={(event) => handleChange("homeTeamId", event.currentTarget.value)}
          />
        </Grid2>
        <Grid2 xs={4}>
          <TextField fullWidth value={state.awayTeamId} label="Away Team ID"
                     onChange={(event) => handleChange("awayTeamId", event.currentTarget.value)}
          />
        </Grid2>

      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <TextField fullWidth value={state.tickerUrl} label="Live Ticker URL"
                     onChange={(event) => handleChange("tickerUrl", event.currentTarget.value)}
          />
        </Grid2>
        <Grid2 xs={3}>
          <FormControl fullWidth
                       variant="filled"
          >
            <InputLabel shrink={true}>
              Auto Refresh Time
            </InputLabel>
            <Input
              fullWidth
              value={state.refreshTime || ""}
              onChange={(event) => handleChange("refreshTime", event.currentTarget.value)}
              type="time"
            />
          </FormControl>
        </Grid2>

        <Grid2 xs={3}>
          <Button
            fullWidth
            onClick={() => handleChange("refreshTime", undefined)}
            variant="contained"
          >
            Clear Refresh Time
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};
