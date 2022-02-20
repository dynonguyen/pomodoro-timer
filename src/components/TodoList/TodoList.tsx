import AddIcon from '@mui/icons-material/AddCircle';
import FilterIcon from '@mui/icons-material/FilterAlt';
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
import useChangeTitle from '../../hooks/useChangeTitle';
import { TaskModel } from '../../models/task.model';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/TodoList';
import TaskItem from './TaskItem';

enum FILTER_VALUE {
	ALL,
	DOING,
	COMPLETED,
}

interface TaskFormProps {
	onAddTaskSuccess: (task: TaskModel) => void;
	onCloseDialog: () => void;
}

function ActionGroup(props: any) {
	const { classes, onAddTaskClick, onFilterChange } = props;
	const { buttonClass, titleClass } = useCommonStyles();
	const [filterTitle, setFilterTitle] = useState('All');

	const handleFilterChange = (value: number = FILTER_VALUE.ALL) => {
		switch (value) {
			case FILTER_VALUE.ALL:
				setFilterTitle('All');
				break;
			case FILTER_VALUE.DOING:
				setFilterTitle('Doing');
				break;
			case FILTER_VALUE.COMPLETED:
				setFilterTitle('Completed');
				break;
			default:
				setFilterTitle('All');
				break;
		}
		onFilterChange(value);
	};

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
					onChange={(e) => handleFilterChange(Number(e.target.value))}
				>
					<MenuItem disabled value={-1}>
						<div className='flex-center'>
							<FilterIcon sx={{ marginRight: '8px' }} />
							<span>Filter - {filterTitle}</span>
						</div>
					</MenuItem>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={1}>Doing</MenuItem>
					<MenuItem value={2}>Completed</MenuItem>
				</Select>

				<Button
					className={`${buttonClass} outlined short no-shadow`}
					startIcon={<AddIcon />}
					variant='contained'
					onClick={onAddTaskClick}
				>
					Add Task
				</Button>
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
	useChangeTitle('Todo List');
	const classes = useStyles();
	const [taskList, setTaskList] = useState<Array<TaskModel>>([]);
	const savedTaskList = useRef<Array<TaskModel>>([]);
	const { uid } = useContext(AccountContext);
	const [showTaskForm, setShowTaskForm] = useState(false);

	const onHoverTaskItem = (id: string) => {
		document.getElementById(id)?.classList.remove('d-none');
	};

	const onMouseOutTaskItem = (id: string) => {
		document.getElementById(id)?.classList.add('d-none');
	};

	const onAddTaskSuccess = (task: TaskModel): void => {
		const newTaskList = [...taskList, task];
		setTaskList([...newTaskList]);
		savedTaskList.current = [...newTaskList];
		setShowTaskForm(false);
	};

	const onRemoveTaskSuccess = (taskId: string): void => {
		const newTaskList = taskList.filter((task) => task.id !== taskId);
		setTaskList([...newTaskList]);
		savedTaskList.current = [...newTaskList];
	};

	const onUpdateTaskSuccess = (
		taskId: string,
		newLabel: string,
		newDesc: string,
	): void => {
		const taskIndex: number = taskList.findIndex((t) => t.id === taskId);
		if (taskIndex !== -1) {
			let newTaskList = [...taskList];
			newTaskList[taskIndex].label = newLabel;
			newTaskList[taskIndex].desc = newDesc;
			setTaskList([...newTaskList]);
		}
	};

	const onFilter = (value: number = FILTER_VALUE.ALL) => {
		let newTaskList: Array<TaskModel> = [];

		switch (value) {
			case FILTER_VALUE.ALL:
				newTaskList = [...savedTaskList.current];
				break;
			case FILTER_VALUE.DOING:
				newTaskList = savedTaskList.current.filter(
					(t) => t.isCompleted === false,
				);
				break;
			case FILTER_VALUE.COMPLETED:
				newTaskList = savedTaskList.current.filter(
					(t) => t.isCompleted === true,
				);
				break;
			default:
				newTaskList = [...savedTaskList.current];
				break;
		}

		setTaskList([...newTaskList]);
	};

	// Load task list
	useEffect(() => {
		(async function () {
			const q = query(
				collection(db, 'tasks'),
				where('uid', '==', uid),
				orderBy('label', 'asc'),
			);
			const querySnapshot = await getDocs(q);

			const tasks: Array<any> = [];
			querySnapshot.forEach((doc) => {
				tasks.push({ ...doc.data(), id: doc.id });
			});

			setTaskList([...tasks]);
			savedTaskList.current = [...tasks];
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
					onFilterChange={onFilter}
				/>

				{/* Task list */}
				<Box className={`${classes.todoWrap} flex-grow-1`}>
					{taskList.length ? (
						<Stack spacing={2} px={4}>
							{taskList.map((task, index) => (
								<TaskItem
									key={index}
									task={task}
									onHover={onHoverTaskItem}
									onMouseOut={onMouseOutTaskItem}
									onRemoveSuccess={onRemoveTaskSuccess}
									onUpdateSuccess={onUpdateTaskSuccess}
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
