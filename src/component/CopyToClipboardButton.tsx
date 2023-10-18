import { Snackbar } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import Button from "@mui/material/Button";

interface Props {
  text?: string
  content: string
}

export const CopyToClipboardButton = ({content, text}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      <Button size={"small"} onClick={handleClick} color="primary" startIcon={<ContentCopyIcon />}>
        { text || ''}
      </Button>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  )
}
