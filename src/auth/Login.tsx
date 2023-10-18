import  { useState } from "react";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { Copyright } from "../layout/Copyright";

interface Props {
  handleLogin: (user: User) => void;
  handleSkipLogin: () => void;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  generic?: string;
}


export const Login = ({ handleLogin, handleSkipLogin }: Props) => {
  const [errors, setErrors] = useState<ValidationErrors | undefined>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString() || "";
    const password = data.get("password")?.toString() || "";

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      handleLogin(userCredential.user);

      setErrors(undefined);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-email") {
          setErrors({
            email: "Invalid E-Mail."
          });

          return;
        }
        if (error.code === "auth/missing-password") {
          setErrors({
            password: "Missing Password."
          });

          return;
        }
        if (error.code === "auth/user-not-found") {
          setErrors({
            generic: "User was not found."
          });

          return;
        }
        if (error.code === "auth/wrong-password") {
          setErrors({
            password: "Incorrect Password"
          });

          return;
        }

        if (error.code === "auth/too-many-requests") {
          setErrors({
            generic: "Too many login attempts."
          });

          return;
        }
      }

      throw error;
    }
  };

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {errors?.generic && <Alert severity="error">{errors.generic}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors?.email}
            helperText={errors?.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors?.password}
            helperText={errors?.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Online Mode
          </Button>
          <Divider/>
          <Button
            fullWidth
            onClick={handleSkipLogin}
            variant="contained"
            color={"success"}
            sx={{ mt: 3, mb: 2 }}
          >
            Offline Mode
          </Button>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};
