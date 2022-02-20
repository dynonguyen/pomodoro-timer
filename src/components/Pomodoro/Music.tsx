import FastForwardIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindIcon from '@mui/icons-material/FastRewindRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeOff from '@mui/icons-material/VolumeOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { IconButton, Slider, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import useStyles from '../../styles/Music';

const DEFAULT_VOLUME: number = 50;
const LS_VOLUME_KEY = 'volume';

interface MusicSrc {
	label: string;
	src: string;
}

const musicList: Array<MusicSrc> = [
	{
		label: 'Cute Lofi Music',
		src: 'https://firebasestorage.googleapis.com/v0/b/dyno-timer.appspot.com/o/Cute%20Lofi%20Music%20Short%20For%20Study%20Relax%20and%20Chill.mp3?alt=media&token=8926e2a2-8bc9-401f-b649-ee8da0d1864e',
	},
	{
		label: 'Lofi Songs For Slow Days',
		src: 'https://firebasestorage.googleapis.com/v0/b/dyno-timer.appspot.com/o/Lofi%20songs%20for%20slow%20days.mp3?alt=media&token=8e6f9dcc-7e70-4641-9c45-53de4f57d4be',
	},
	{
		label: 'Rain Sound',
		src: 'https://firebasestorage.googleapis.com/v0/b/dyno-timer.appspot.com/o/Rain.mp3?alt=media&token=8b090dca-20c8-4f0b-b694-7deb6b51afc4',
	},
	{
		label: 'Ocean Waves',
		src: 'https://firebasestorage.googleapis.com/v0/b/dyno-timer.appspot.com/o/Ocean%20Waves.mp3?alt=media&token=255fd624-761c-4b18-b9b8-a6a4821cca5d',
	},
];

function getVolumeFromLS(): number {
	const volumeStr = localStorage.getItem(LS_VOLUME_KEY);
	if (volumeStr && !isNaN(Number(volumeStr))) {
		return Number(volumeStr);
	}
	return DEFAULT_VOLUME;
}

function setVolumeToLS(volume: number = DEFAULT_VOLUME) {
	localStorage.setItem(LS_VOLUME_KEY, volume.toString());
}

function Music() {
	const classes = useStyles();
	const [playing, setPlaying] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(getVolumeFromLS());
	const [musicIndex, setMusicIndex] = useState(0);
	const audio = useRef<HTMLAudioElement>(new Audio(musicList[0].src));

	useEffect(() => {
		audio.current.volume = volume / 100;
		setVolumeToLS(volume);
	}, [volume]);

	useEffect(() => {
		audio.current.loop = true;
		return () => {
			audio.current.pause();
		};
	}, []);

	const onMusicChange = (newMusicIndex: number = 0) => {
		audio.current.src = musicList[newMusicIndex].src;
		audio.current.currentTime = 0;
		audio.current.play();
		setPlaying(true);
		setMusicIndex(newMusicIndex);
	};

	const onPlayOrPauseMusic = () => {
		if (playing) {
			audio.current.pause();
		} else {
			audio.current.play();
		}
		setPlaying(!playing);
	};

	const onNextOrPreviousMusic = (newMusicIndex: number) => {
		setMusicIndex(newMusicIndex);
		onMusicChange(newMusicIndex);
	};

	return (
		<Box p={2} className='flex-center-between flex-col wh-100'>
			{/* Choose a music */}
			<FormControl fullWidth>
				<Select
					variant='outlined'
					displayEmpty
					id='musicSelect'
					size='small'
					value={musicIndex}
					onChange={(e) => onMusicChange(Number(e.target.value))}
				>
					<MenuItem disabled value={-1}>
						<em>Choose a song</em>
					</MenuItem>
					{musicList.map((music, index) => (
						<MenuItem key={index} value={index}>
							{music.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Music controls */}
			<Box my={2} width='100%'>
				<Box mb={1} className={`${classes.musicControls} flex-center`}>
					<IconButton
						className={musicIndex === 0 ? 'disabled' : ''}
						onClick={() => onNextOrPreviousMusic(musicIndex - 1)}
					>
						<FastRewindIcon fontSize='large' />
					</IconButton>
					<IconButton onClick={onPlayOrPauseMusic}>
						{playing ? (
							<PauseRoundedIcon fontSize='large' />
						) : (
							<PlayArrow fontSize='large' />
						)}
					</IconButton>
					<IconButton
						className={musicIndex === musicList.length - 1 ? 'disabled' : ''}
						onClick={() => onNextOrPreviousMusic(musicIndex + 1)}
					>
						<FastForwardIcon fontSize='large' />
					</IconButton>
				</Box>

				{/* Volume control */}
				<Stack
					className='w-100'
					spacing={1}
					direction='row'
					alignItems='center'
				>
					<VolumeOff
						className={classes.volumeIcon}
						fontSize='small'
						onClick={() => setVolume(0)}
					/>
					<Slider
						size='small'
						aria-label='Volume'
						max={100}
						min={0}
						step={1}
						value={volume}
						valueLabelDisplay='auto'
						onChange={(e, newVolume) => setVolume(Number(newVolume))}
					/>
					<VolumeUp
						className={classes.volumeIcon}
						fontSize='small'
						onClick={() => setVolume(100)}
					/>
				</Stack>
			</Box>

			{/* Music animation */}
			<Box className='flex-center' sx={{ height: '1.5rem', flexShrink: 0 }}>
				{new Array(16).fill(0).map((_, index) => (
					<Box
						key={index}
						mx={0.5}
						className={`${classes.musicStroke} ${
							playing ? classes.musicAnimation : ''
						}`}
					></Box>
				))}
			</Box>
		</Box>
	);
}

export default Music;
