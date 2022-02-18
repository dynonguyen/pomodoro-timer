import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../configs/firebase';
import { formatDate } from '../../helpers';
import { TaskModel } from '../../models/task.model';
import useStyles from '../../styles/TaskItem';

interface TaskItemProps {
	task: TaskModel;
	onHover: (taskId: string) => void;
	onMouseOut: (taskId: string) => void;
	onRemoveSuccess: (taskId: string) => void;
}

function TaskItem(props: TaskItemProps) {
	const { onHover, onMouseOut, task, onRemoveSuccess } = props;
	const classes = useStyles();
	const { label, isCompleted, createdDate, id: taskId = '', desc } = task;
	const [completedState, setCompletedState] = useState(isCompleted);
	const [showDesc, setShowDesc] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);

	const updateIsCompleted = async (): Promise<void> => {
		setCompletedState(!completedState);
		const taskRef = doc(db, 'tasks', taskId);
		await updateDoc(taskRef, {
			isCompleted: !completedState,
		});
	};

	const removeTask = async (): Promise<void> => {
		setIsRemoving(true);
		try {
			await deleteDoc(doc(db, 'tasks', taskId));
			onRemoveSuccess(taskId);
		} catch (error) {
		} finally {
			setIsRemoving(false);
		}
	};

	return (
		<>
			{/* Task description */}
			{showDesc && (
				<Dialog open={showDesc} onClose={() => setShowDesc(false)}>
					<DialogTitle color='darkgreen'>{label}</DialogTitle>
					<DialogContent>
						<Typography mb={1}>
							<b>Description:&nbsp;</b> {desc}
						</Typography>
						<Typography mb={1}>
							<b>Creation date:&nbsp;</b> {formatDate(new Date(createdDate))}
						</Typography>
						<Typography>
							<b>Status:&nbsp;</b>
							{completedState ? 'Completed' : 'Doing'}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							variant='contained'
							color='primary'
							onClick={() => setShowDesc(false)}
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			)}

			{/* Task item */}
			<ListItem
				className={isRemoving ? 'disabled' : ''}
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
						<IconButton onClick={() => setShowDesc(true)}>
							<VisibilityIcon />
						</IconButton>
						<IconButton onClick={() => console.log('Hello')}>
							<EditIcon />
						</IconButton>
						<IconButton onClick={removeTask}>
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
							onClick={updateIsCompleted}
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
		</>
	);
}

export default TaskItem;
