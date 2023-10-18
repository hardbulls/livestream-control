import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import {red, green} from "@mui/material/colors";
import { ObsStudioIcon } from "./icons/ObsStudioIcon";

interface Props {
  online: boolean
  obsConnected: boolean

}
export const StatusBar = ({online, obsConnected}: Props) => {
  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"} justifyContent={"center"}>
      <div>
        {online ? (
          <Chip icon={<WifiIcon style={{ color: green['500']}}/>} label="Online" sx={{p: 2}}  />
          ) :
          (
          <Chip icon={<WifiOffIcon style={{ color: red['500']}}/>} label="Offline" sx={{p: 2}} />
          )
        }
      </div>
      <div>
        {obsConnected ? (
            <Chip icon={<ObsStudioIcon color={green['500']} />} label="Connected" sx={{p: 2}} />
          ) :
          (
            <Chip icon={<ObsStudioIcon color={red['500']} />} label="Disconnected" sx={{p:2}} />
          )
        }
      </div>
    </Stack>
  )
}
