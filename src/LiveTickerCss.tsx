
import { State } from "./baseball/model/State";
import { WBSC_OVERLAY_PLAYER } from "./css-generator/wbsc-overlay-players";
import { WBSC_OVERLAY_BOX } from "./css-generator/wbsc-overlay-box";
import { OVERLAY_SPONSORS } from "./css-generator/sponsor-overlay";
import { WBSC_OVERLAY_LINEUP } from "./css-generator/wbsc-overlay-lineup";
import { CopyToClipboardButton } from "./component/CopyToClipboardButton";
import Stack from "@mui/material/Stack";

interface Props {
  state: State,
}

export const LiveTickerCss = ({ state }: Props) => {
  const scoreBoxCss = WBSC_OVERLAY_BOX(state);
  const playerBoxCss = WBSC_OVERLAY_PLAYER(state);
  const sponsorBoxCss = OVERLAY_SPONSORS(state);
  const lineupBoxCss = WBSC_OVERLAY_LINEUP(state);

  return (
    <Stack direction={"row"} justifyContent="space-between">
        <CopyToClipboardButton content={scoreBoxCss} text="Scoreboard CSS"/>
        <CopyToClipboardButton content={playerBoxCss} text="Playerbox CSS"/>
        <CopyToClipboardButton content={lineupBoxCss} text="Lineup CSS"/>
        <CopyToClipboardButton content={sponsorBoxCss} text="Sponsors CSS"/>
    </Stack>
  );
};
