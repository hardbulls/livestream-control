import Grid2 from "@mui/material/Unstable_Grid2";
import { Alert } from "@mui/material";


export const Info = () => {

  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={12}>
        <Alert severity="info">
          Launch OBS with --enable-experimental-web-platform-features<br />
          Add a scene for the overlay: `hb_overlay`<br />
          Add two browser sources: `hb_score` and `hb_players`<br/>
          For lineups, add browser source: `hb_lineup`
        </Alert>
      </Grid2>
    </Grid2>
  );
};
