import { Box, Typography, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TaskModel } from '../../models/task.model';

const todoList: Array<TaskModel> = [
	{
		id: '1124',
		uid: '213124',
		label: 'Học Typescript',
		isCompleted: false,
		createdDate: new Date(),
	},
];

function TaskBox() {
	const theme = useTheme();

	return (
		<Box p={2} className='wh-100 flex-col'>
			<Typography
				color={theme.palette.text.primary}
				variant='h5'
				component='h5'
				sx={{ textAlign: 'center', marginBottom: '12px' }}
			>
				Task
			</Typography>

			<FormControl fullWidth>
				<Select
					variant='outlined'
					displayEmpty
					id='musicSelect'
					size='small'
					value={-1}
				>
					<MenuItem disabled value={-1}>
						<em>Choose a task</em>
					</MenuItem>

					{todoList.map((todo) => (
						<MenuItem key={todo.id} value={todo.id}>
							{todo.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default TaskBox;
