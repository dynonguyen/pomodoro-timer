import AddIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	addDoc,
	collection,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import { db } from '../../configs/firebase';
import { MAX_LEN } from '../../constants/lengths';
import { AccountContext } from '../../contexts/AccountContext';
import useMobile from '../../hooks/useMobile';
import { TaskModel } from '../../models/task.model';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/TodoList';
import TaskItem from './TaskItem';

interface TaskFormProps {
	onAddTaskSuccess: (task: TaskModel) => void;
	onCloseDialog: () => void;
}

function MobileActionGroup(props: any) {
	const { classes } = props;

	return (
		<Select
			classes={{ root: classes.selectRoot }}
			variant='outlined'
			size='small'
			displayEmpty
			value={-1}
		>
			<MenuItem disabled value={-1}>
				<em>Actions</em>
			</MenuItem>

			<MenuItem>Add Task</MenuItem>
			<MenuItem>Remove All</MenuItem>
			<MenuItem>Remove Completed Tasks</MenuItem>
		</Select>
	);
}

function DesktopActionGroup(props: any) {
	const { buttonClass, onAddTaskClick } = props;
	return (
		<>
			<Button
				className={`${buttonClass} short no-shadow`}
				startIcon={<AddIcon />}
				variant='contained'
				onClick={onAddTaskClick}
			>
				Add Task
			</Button>
			<Button
				className={`${buttonClass} stop short no-shadow`}
				startIcon={<DeleteForeverIcon />}
				variant='contained'
			>
				Remove all
			</Button>
		</>
	);
}

function ActionGroup(props: any) {
	const { classes, onAddTaskClick } = props;
	const { buttonClass, titleClass } = useCommonStyles();
	const isSmDevice = useMobile('sm');

	return (
		<>
			<Typography variant='h3' className={titleClass} component='h2'>
				TODO LIST
			</Typography>

			{/* Action groups */}
			<Stack
				spacing={2}
				my={3}
				alignItems='center'
				justifyContent='center'
				direction='row'
			>
				<Select
					classes={{ root: classes.selectRoot }}
					variant='outlined'
					size='small'
					displayEmpty
					value={-1}
				>
					<MenuItem disabled value={-1}>
						<em>Filter</em>
					</MenuItem>
				</Select>

				<Select
					classes={{ root: classes.selectRoot }}
					variant='outlined'
					size='small'
					displayEmpty
					value={-1}
				>
					<MenuItem disabled value={-1}>
						<em>Sorting</em>
					</MenuItem>
				</Select>

				{isSmDevice ? (
					<MobileActionGroup classes={classes} />
				) : (
					<DesktopActionGroup
						buttonClass={buttonClass}
						onAddTaskClick={onAddTaskClick}
					/>
				)}
			</Stack>
		</>
	);
}

function TaskForm(props: TaskFormProps) {
	const classes = useStyles();
	const { buttonClass } = useCommonStyles();
	const { onCloseDialog, onAddTaskSuccess } = props;
	const newTaskRef = useRef({ label: '', desc: '' });
	const [error, setError] = useState({ isError: false, msg: '' });
	const { uid } = useContext(AccountContext);
	const [isAdding, setIsAdding] = useState(false);

	const onAddNewTask = async (): Promise<void> => {
		let { desc, label } = newTaskRef.current;
		[desc, label] = [desc.trim(), label.trim()];

		if (label === '') {
			setError({ isError: true, msg: 'Enter the task label !' });
			return;
		}

		if (label.length > MAX_LEN.TASK_LABEL || desc.length > MAX_LEN.TASK_DESC)
			return;

		setIsAdding(true);
		// check task existence
		const q = query(collection(db, 'tasks'), where('label', '==', label));
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			setError({ isError: true, msg: 'The task already exists !' });
			return;
		}

		// Add new task
		const newTask: TaskModel = {
			createdDate: new Date().toString(),
			isCompleted: false,
			label,
			desc,
			pomodoroTime: 0,
			uid,
		};
		const taskDoc = await addDoc(collection(db, 'tasks'), newTask);
		onAddTaskSuccess({ ...newTask, id: taskDoc.id });
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
				<b style={{ marginLeft: '8px' }}>New Task</b>
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
						inputProps={{ maxLength: MAX_LEN.TASK_LABEL }}
						onChange={(e) => (newTaskRef.current.label = e.target.value)}
					/>
					<TextField
						sx={{ marginTop: '12px' }}
						placeholder='Description'
						multiline
						rows={4}
						variant='outlined'
						inputProps={{ maxLength: MAX_LEN.TASK_DESC }}
						onChange={(e) => (newTaskRef.current.desc = e.target.value)}
					/>
				</Box>
			</DialogContent>

			<DialogActions className={classes.taskFormActions}>
				<Button onClick={onCloseDialog} sx={{ color: 'GrayText' }}>
					Cancel
				</Button>
				<Button
					onClick={onAddNewTask}
					className={`${buttonClass} short no-shadow ${
						isAdding ? 'disabled' : ''
					}`}
				>
					Add Task
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function TodoList() {
	const classes = useStyles();
	const [taskList, setTaskList] = useState<Array<TaskModel>>([]);
	const { uid } = useContext(AccountContext);
	const [showTaskForm, setShowTaskForm] = useState(false);

	const onHoverTaskItem = (id: string) => {
		document.getElementById(id)?.classList.remove('d-none');
	};

	const onMouseOutTaskItem = (id: string) => {
		document.getElementById(id)?.classList.add('d-none');
	};

	const onAddTaskSuccess = (task: TaskModel): void => {
		setTaskList([...taskList, task]);
		setShowTaskForm(false);
	};

	// Load task list
	useEffect(() => {
		(async function () {
			const q = query(
				collection(db, 'tasks'),
				where('uid', '==', uid),
				orderBy('label', 'desc'),
			);
			const querySnapshot = await getDocs(q);

			const tasks: Array<any> = [];
			querySnapshot.forEach((doc) => {
				tasks.push({ ...doc.data(), id: doc.id });
			});

			setTaskList([...tasks]);
		})();
		return () => {};
	}, []);

	return (
		<>
			{/* New task form */}
			{showTaskForm && (
				<TaskForm
					onCloseDialog={() => setShowTaskForm(false)}
					onAddTaskSuccess={onAddTaskSuccess}
				/>
			)}

			<Box py={4} px={2} className='box d-flex flex-col'>
				{/* Action group */}
				<ActionGroup
					classes={classes}
					onAddTaskClick={() => setShowTaskForm(true)}
				/>

				{/* Task list */}
				<Box className={`${classes.todoWrap} flex-grow-1`}>
					{taskList.length ? (
						<Stack spacing={2} px={4}>
							{taskList.map((task, index) => (
								<TaskItem
									key={index}
									onHover={onHoverTaskItem}
									onMouseOut={onMouseOutTaskItem}
									task={task}
								/>
							))}
						</Stack>
					) : (
						<Typography my={2} textAlign='center' color='GrayText'>
							You have no todo assignment. <b>"Add Task"</b> now 🍅
						</Typography>
					)}
				</Box>
			</Box>
		</>
	);
}

export default TodoList;
