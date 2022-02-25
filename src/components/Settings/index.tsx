import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import {
	Box,
	MenuItem,
	Select,
	Slider,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import CustomInput from '../Commons/CustomInput';

function Settings() {
	return (
		<Box className='box'>
			{/* title */}
			<Typography
				variant='h3'
				pt={2}
				component='h1'
				fontWeight={500}
				textAlign='center'
			>
				Dyno Timer Settings
			</Typography>

			<Stack px={4} py={2} spacing={2}>
				<Box>
					<Typography variant='h6' component='p' color='gray'>
						Time (minutes)
					</Typography>
					<Stack direction='row' spacing={2} mt={1}>
						<CustomInput placeholder='Pomodoro' type='number' min={1} />
						<CustomInput placeholder='Short Break' type='number' min={1} />
						<CustomInput placeholder='Long Break' type='number' min={1} />
					</Stack>
				</Box>

				<Box display='flex' alignItems='center'>
					<Typography mr={2} variant='h6' component='p' color='gray'>
						Long break interval (times)?
					</Typography>
					<CustomInput type='number' min={1} max={10} />
				</Box>

				<Box display='flex' alignItems='center'>
					<Typography variant='h6' component='p' color='gray'>
						Auto close notification after (seconds)?
					</Typography>
					<Switch color='primary' size='medium' />
					<CustomInput type='number' min={1} max={10} />
				</Box>

				<Box display='flex'>
					<Typography variant='h6' component='p' color='gray'>
						Auto start breaks?
					</Typography>
					<Switch color='primary' size='medium' />
				</Box>

				<Box display='flex' alignItems='center'>
					<Typography variant='h6' component='p' color='gray'>
						Autocomplete task when timeout?
					</Typography>
					<Switch color='primary' size='medium' />
				</Box>

				{/* sound */}
				<Stack spacing={1}>
					<Box display='flex' alignItems='center'>
						<Typography variant='h6' component='p' color='gray' mr={2}>
							Alarm Sound?
						</Typography>
						<Select
							placeholder='Sound'
							value={10}
							size='small'
							sx={{ minWidth: 200 }}
						>
							<MenuItem value={10}>None</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</Box>

					<Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
						<VolumeDown sx={{ color: '#555' }} />
						<Slider aria-label='Volume' value={10} />
						<VolumeUp sx={{ color: '#555' }} />
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}

export default Settings;
