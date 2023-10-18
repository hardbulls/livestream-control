
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Copyright } from "./layout/Copyright";
import { AppMode } from "./baseball/model/AppMode";


interface Props {
  handleModeSelect: (mode: AppMode) => void
}

export const ModeSelect = ({handleModeSelect}: Props) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5">
          Select Mode
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            onClick={() => handleModeSelect(AppMode.FULL)}
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Full Control
          </Button>
          <Divider/>
          <Button
            fullWidth
            onClick={() => handleModeSelect(AppMode.CONTROL)}
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Remote Control
          </Button>
        </Box>
      </Box>
      <Copyright />
    </Container>
  )
}
