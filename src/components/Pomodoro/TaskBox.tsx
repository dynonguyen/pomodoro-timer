import { Box, Typography, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../configs/firebase';
import { AccountContext } from '../../contexts/AccountContext';
import { TaskBoxContext } from '../../contexts/TaskBoxContext';
import { TaskModel } from '../../models/task.model';

function TaskBox() {
	const theme = useTheme();
	const { isAuth, uid } = useContext(AccountContext);
	const { isDisabled, setTask } = useContext(TaskBoxContext);
	const [taskList, setTaskList] = useState<Array<TaskModel>>([]);
	const [selectedTask, setSelectedTask] = useState<string>('default');

	// Load task list
	useEffect(() => {
		(async function () {
			if (isAuth) {
				const q = query(
					collection(db, 'tasks'),
					where('uid', '==', uid),
					where('isCompleted', '==', false),
				);
				const querySnapshot = await getDocs(q);

				const tasks: Array<any> = [];
				querySnapshot.forEach((doc) => {
					tasks.push({ ...doc.data(), id: doc.id });
				});

				setTaskList([...tasks]);
			}
		})();
		return () => {};
	}, [isAuth]);

	const onTaskSelectChange = (taskId: string) => {
		setSelectedTask(taskId);
		setTask(taskId);
	};

	return (
		<Box
			p={2}
			className={`wh-100 flex-col ${!isAuth ? 'disabled' : ''} ${
				isDisabled ? 'disabled' : ''
			}`}
		>
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
					value={selectedTask}
					onChange={(e) => onTaskSelectChange(e.target.value)}
				>
					<MenuItem disabled value='default'>
						<em>Choose a task</em>
					</MenuItem>

					{taskList.map((task, index) => (
						<MenuItem key={index} value={task.id}>
							{task.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{!isAuth && (
				<Typography textAlign='center' color='red' mt={1}>
					Please login to use
				</Typography>
			)}
		</Box>
	);
}

export default TaskBox;
