import { convertFileToBase64 } from "../service/file-to-base64";
import { resizeImage } from "../service/image-resize";
import { getResizedImage } from "../service/assets";
import { Image } from "./model/Image";
import { CONFIG } from "../config";
import { HomeAwayEnum } from "./model/HomeAwayEnum";
import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2";
import { State } from "./model/State";

interface Props {
  type: HomeAwayEnum,
  state: State
  value?: string,
  handleFileUpload: (image: Image) => void
}

export const LogoUpload = ({ state, type, handleFileUpload }: Props) => {
  const convertAndResizeImage = async (file: File | Blob) => {
    return await resizeImage(100, await convertFileToBase64(file));
  };

  const handleSelect = async (value: string) => {
    if (value === '') {

      handleFileUpload({
        name: undefined,
        data: undefined
      });

      return;
    }

    handleFileUpload({
      name: value,
      data: await getResizedImage(`teams/${value}`)
    });
  };

  const logoName = type === HomeAwayEnum.HOME ? state.homeLogo?.name : state.awayLogo?.name

  return (
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <FormControl fullWidth
                       variant="filled"
          >
            <InputLabel shrink={true}>Upload {type.toLowerCase()} Logo</InputLabel>
            <Input
              type="file"
              name={`${type}Logo`}
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                const files = event.target.files;

                if (files && files[0]) {
                  handleFileUpload({
                    data: await convertAndResizeImage(files[0])
                  });
                }
              }}
            />
          </FormControl>
        </Grid2>

        <Grid2 xs={6}>
          <FormControl fullWidth>
            <InputLabel>Select {type.toLowerCase()} Logo</InputLabel>
            <Select
              fullWidth
              value={logoName && CONFIG.teams.map(v => v.logo).includes(logoName) ? logoName : ''}
              label={`Select ${type} Logo`}
              onChange={(event) => handleSelect(event.target.value)}
            >
                <MenuItem value={''}>
                  None
                </MenuItem>

                {CONFIG.teams.sort((a, b) => (a.name > b.name) ? 1 : -1).map(team => (
                <MenuItem
                  key={team.logo}
                  value={team.logo}
                >
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
  );
};
