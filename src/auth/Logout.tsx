import Button from "@mui/material/Button";


interface Props {
  handleLogout: () => void
}

export const Logout = ({handleLogout}: Props) => {
  return (
    <Button
      fullWidth
      onClick={handleLogout}
      variant="outlined"
      sx={{ mt: 3, mb: 2 }}
    >
      Logout
    </Button>
  );
};
