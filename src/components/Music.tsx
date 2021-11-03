import FastForwardIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindIcon from '@mui/icons-material/FastRewindRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { IconButton, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import useStyles from '../styles/Music';

interface MusicSrc {
  id: number;
  name: string;
  src: string;
}

const MUSIC_LIST: Array<MusicSrc> = [
  {
    id: 0,
    name: 'Rain',
    src: '../assets/audios/rain.mp3',
  },
];

function Music() {
  const classes = useStyles();

  return (
    <Box p={2} className="flex-center-between flex-col wh-100">
      {/* Choose a music */}
      <FormControl fullWidth>
        <Select
          variant="outlined"
          displayEmpty
          id="musicSelect"
          size="small"
          value={-1}
        >
          <MenuItem disabled value={-1}>
            <em>Choose a song</em>
          </MenuItem>
          {MUSIC_LIST.map((music, index) => (
            <MenuItem key={index} value={music.id}>
              {music.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Music controls */}
      <Box my={2} width="100%">
        <Box mb={1} className={`${classes.musicControls} flex-center`}>
          <IconButton>
            <FastRewindIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <PauseRoundedIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <FastForwardIcon fontSize="large" />
          </IconButton>
        </Box>

        <Stack
          className="w-100"
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <VolumeDown className={classes.volumeIcon} fontSize="small" />
          <Slider size="small" aria-label="Volume" value={10} />
          <VolumeUp className={classes.volumeIcon} fontSize="small" />
        </Stack>
      </Box>

      {/* Music animation */}
      <Box className="flex-center" sx={{ height: '1.5rem', flexShrink: 0 }}>
        {new Array(16).fill(0).map((_, index) => (
          <Box key={index} mx={0.5} className={classes.musicStroke}></Box>
        ))}
      </Box>
    </Box>
  );
}

export default Music;
