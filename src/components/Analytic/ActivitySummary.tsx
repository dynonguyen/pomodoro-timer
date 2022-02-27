import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { formatDate } from '../../helpers';
import { PomodoroModel } from '../../models/pomodoro.model';
import useStyle from '../../styles/ActivitySummary';

interface ActivitySummaryProps {
	data: Array<PomodoroModel>;
}

function ActivitySummary({ data }: ActivitySummaryProps) {
	const classes = useStyle();
	const minutesFocused: number = data.reduce(
		(total, item) => total + item.time,
		0,
	);
	const hoursFocused: string = (minutesFocused / 60).toFixed(2);

	const daysAccessed: Set<string> = new Set();
	data.forEach((i) => daysAccessed.add(formatDate(new Date(i.createdDate))));

	return (
		<Box mb={2} className='flex-center'>
			<Box className={`d-flex ${classes.box}`}>
				<Box mr={2}>
					<AccessTimeIcon className={classes.icon} />
					<Typography className={classes.label}>Hours Focused</Typography>
				</Box>
				<Typography component='b' className={classes.count}>
					{hoursFocused}
				</Typography>
			</Box>

			<Box ml={3} className={`d-flex ${classes.box}`}>
				<Box mr={2}>
					<CalendarIcon className={classes.icon} />
					<Typography className={classes.label}>Days Accessed</Typography>
				</Box>
				<Typography component='b' className={classes.count}>
					{daysAccessed.size}
				</Typography>
			</Box>
		</Box>
	);
}

export default ActivitySummary;
