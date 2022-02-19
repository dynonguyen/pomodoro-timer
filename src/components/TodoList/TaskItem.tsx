import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../../configs/firebase';
import { MAX_LEN } from '../../constants/lengths';
import { formatDate } from '../../helpers';
import { TaskModel } from '../../models/task.model';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/TaskItem';
import useTodoStyles from '../../styles/TodoList';

interface TaskItemProps {
	task: TaskModel;
	onHover: (taskId: string) => void;
	onMouseOut: (taskId: string) => void;
	onRemoveSuccess: (taskId: string) => void;
	onUpdateSuccess: (taskId: string, newLabel: string, newDesc: string) => void;
}

interface EditTaskFormProps {
	defaultLabel?: string;
	defaultDesc?: string;
	taskId: string;
	onCloseDialog: () => void;
	onUpdateTaskSuccess: (
		taskId: string,
		newLabel: string,
		newDesc: string,
	) => void;
}

function EditTaskForm(props: EditTaskFormProps) {
	const classes = useTodoStyles();
	const { buttonClass } = useCommonStyles();
	const {
		onCloseDialog,
		onUpdateTaskSuccess,
		defaultDesc,
		defaultLabel,
		taskId,
	} = props;
	const taskRef = useRef({ label: defaultLabel, desc: defaultDesc });
	const [error, setError] = useState({ isError: false, msg: '' });
	const [isUpdating, setIsUpdating] = useState(false);

	const onUpdateTask = async () => {
		let { label, desc } = taskRef.current;
		[label, desc] = [label?.trim() || '', desc?.trim() || ''];

		if (desc === defaultDesc && label === defaultLabel) {
			return onCloseDialog();
		}

		if (label === '') {
			setError({ isError: true, msg: 'Enter the task label !' });
			return;
		}

		if (label.length > MAX_LEN.TASK_LABEL || desc.length > MAX_LEN.TASK_DESC)
			return;

		setIsUpdating(true);
		try {
			await updateDoc(doc(db, 'tasks', taskId), {
				label,
				desc,
			});
			onUpdateTaskSuccess(taskId, label, desc);
		} catch (err) {
		} finally {
			onCloseDialog();
			setIsUpdating(false);
		}
	};

	return (
		<Dialog
			open={true}
			onClose={onCloseDialog}
			classes={{
				paper: classes.taskFormPaper,
			}}
			maxWidth='md'
		>
			<DialogTitle>
				<b style={{ marginLeft: '8px' }}>Edit Task</b>
			</DialogTitle>

			<DialogContent>
				<Box pt={1} className='d-flex flex-col'>
					{error.isError && (
						<Typography component='p' className={classes.errorMessage}>
							{error.msg}
						</Typography>
					)}
					<TextField
						placeholder='Label'
						variant='outlined'
						autoFocus
						inputProps={{
							maxLength: MAX_LEN.TASK_LABEL,
							defaultValue: defaultLabel,
						}}
						onChange={(e) => (taskRef.current.label = e.target.value)}
					/>
					<TextField
						sx={{ marginTop: '12px' }}
						placeholder='Description'
						multiline
						rows={4}
						variant='outlined'
						inputProps={{
							maxLength: MAX_LEN.TASK_DESC,
							defaultValue: defaultDesc,
						}}
						onChange={(e) => (taskRef.current.desc = e.target.value)}
					/>
				</Box>
			</DialogContent>

			<DialogActions className={classes.taskFormActions}>
				<Button onClick={onCloseDialog} sx={{ color: 'GrayText' }}>
					Cancel
				</Button>
				<Button
					onClick={onUpdateTask}
					className={`${buttonClass} short no-shadow ${
						isUpdating ? 'disabled' : ''
					}`}
				>
					Edit Task
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function TaskItem(props: TaskItemProps) {
	const { onHover, onMouseOut, task, onRemoveSuccess, onUpdateSuccess } = props;
	const classes = useStyles();
	const { label, isCompleted, createdDate, id: taskId = '', desc } = task;
	const [completedState, setCompletedState] = useState(isCompleted);
	const [showDesc, setShowDesc] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);

	const updateIsCompleted = async (): Promise<void> => {
		setCompletedState(!completedState);
		const taskRef = doc(db, 'tasks', taskId);
		await updateDoc(taskRef, {
			isCompleted: !completedState,
		});
	};

	useEffect(() => {
		setCompletedState(isCompleted);
		return () => {};
	}, [isCompleted]);

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
			{/* Edit task */}
			{showEditForm && (
				<EditTaskForm
					onCloseDialog={() => setShowEditForm(false)}
					onUpdateTaskSuccess={onUpdateSuccess}
					defaultLabel={label}
					defaultDesc={desc}
					taskId={taskId}
				/>
			)}

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
						<IconButton onClick={() => setShowEditForm(true)}>
							<EditIcon />
						</IconButton>
						<IconButton onClick={removeTask}>
							<DeleteIcon />
						</IconButton>
					</Stack>
				}
				disablePadding
			>
				<ListItemButton dense>
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
