import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { formatDate } from '../../helpers';
import { TaskModel } from '../../models/task.model';
import useStyles from '../../styles/TodoList';

interface TaskItemProps {
	task: TaskModel;
	onHover: (taskId: string) => void;
	onMouseOut: (taskId: string) => void;
}

function TaskItem(props: TaskItemProps) {
	const { onHover, onMouseOut, task } = props;
	const classes = useStyles();
	const { label, isCompleted, createdDate, id: taskId } = task;
	const [completedState, setCompletedState] = useState(isCompleted);

	return (
		<ListItem
			onMouseEnter={() => onHover(taskId)}
			onMouseLeave={() => onMouseOut(taskId)}
			key={taskId}
			secondaryAction={
				<Stack
					spacing={0.5}
					id={taskId}
					direction='row'
					className={`${classes.action} d-none`}
				>
					<IconButton aria-label='comments'>
						<VisibilityIcon />
					</IconButton>
					<IconButton aria-label='comments'>
						<EditIcon />
					</IconButton>
					<IconButton aria-label='comments'>
						<DeleteIcon />
					</IconButton>
				</Stack>
			}
			disablePadding
		>
			<ListItemButton role={undefined} dense>
				<ListItemIcon>
					<Checkbox
						edge='start'
						tabIndex={-1}
						disableRipple
						checked={completedState}
						onClick={() => setCompletedState(!completedState)}
						classes={{
							root: classes.checkbox,
							checked: classes.checkboxChecked,
						}}
					/>
				</ListItemIcon>
				<ListItemText
					classes={{
						primary: classes.todoText,
						secondary: classes.todoTextSec,
					}}
					primary={label}
					secondary={formatDate(new Date(createdDate))}
				/>
			</ListItemButton>
		</ListItem>
	);
}

export default TaskItem;
