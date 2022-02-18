import AddIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
	Box,
	Button,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../configs/firebase';
import { AccountContext } from '../../contexts/AccountContext';
import useMobile from '../../hooks/useMobile';
import { TaskModel } from '../../models/task.model';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/TodoList';
import TaskItem from './TaskItem';

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
	const { buttonClass } = props;
	return (
		<>
			<Button
				className={`${buttonClass} short no-shadow`}
				startIcon={<AddIcon />}
				variant='contained'
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
	const { classes } = props;
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
					<DesktopActionGroup buttonClass={buttonClass} />
				)}
			</Stack>
		</>
	);
}

function TodoList() {
	const classes = useStyles();
	const [taskList, setTaskList] = useState<Array<TaskModel>>([]);
	const { uid } = useContext(AccountContext);

	const onHoverTaskItem = (id: string) => {
		document.getElementById(id)?.classList.remove('d-none');
	};

	const onMouseOutTaskItem = (id: string) => {
		document.getElementById(id)?.classList.add('d-none');
	};

	// Load task list
	useEffect(() => {
		(async function () {
			const q = query(collection(db, 'tasks'), where('uid', '==', uid));
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
		<Box py={4} px={2} className='box d-flex flex-col'>
			{/* Action group */}
			<ActionGroup classes={classes} />

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
	);
}

export default TodoList;
