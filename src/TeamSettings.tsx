
import Grid2 from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { HomeAwayEnum } from "./baseball/model/HomeAwayEnum";
import { LogoUpload } from "./baseball/LogoUpload";
import { State } from "./baseball/model/State";

interface Props {
  state: State;
  handleChange: <T extends keyof State>(key: T, value: State[T]) => void;
}

export const TeamSettings = ({ state, handleChange }: Props) => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <TextField fullWidth value={state.home} label="Home Team"
                     onChange={(event) => handleChange("home", event.target.value)} />
        </Grid2>
        <Grid2 xs={6}>
          <TextField fullWidth value={state.away} label="Away Team"
                     onChange={(event) => handleChange("away", event.target.value)} />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <LogoUpload state={state} type={HomeAwayEnum.HOME} value={state.homeLogo?.name}
                      handleFileUpload={file => handleChange("homeLogo", file)} />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <LogoUpload state={state} type={HomeAwayEnum.AWAY} value={state.awayLogo?.name}
                      handleFileUpload={(file) => handleChange("awayLogo", file)} />
        </Grid2>
      </Grid2>
    </>
  );
};
