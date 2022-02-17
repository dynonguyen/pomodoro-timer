import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Box,
	Button,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMobile from '../../hooks/useMobile';
import { useCommonStyles } from '../../styles/commons/CommonStyle';
import useStyles from '../../styles/TodoList';

function ConfirmDeleteTodo() {
	return <Button>Hello</Button>;
}

function TodoList() {
	const classes = useStyles();
	const { buttonClass, titleClass } = useCommonStyles();
	const isSmDevice = useMobile('sm');

	const onHover = (id: string) => {
		document.getElementById(id)?.classList.remove('d-none');
	};

	const onMouseOut = (id: string) => {
		document.getElementById(id)?.classList.add('d-none');
	};

	return (
		<Box py={4} px={2} className='box d-flex flex-col'>
			<Typography variant='h3' className={titleClass} component='h2'>
				TODO LIST
			</Typography>

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
					<>
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
					</>
				) : (
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
				)}
			</Stack>

			<Box className={`${classes.todoWrap} flex-grow-1`}>
				<Stack spacing={2} px={4}>
					{new Array(20).fill(1).map((value, index) => {
						const labelId = `checkbox-list-label-${index}`;

						return (
							<ListItem
								onMouseEnter={() => onHover(index.toString())}
								onMouseLeave={() => onMouseOut(index.toString())}
								key={index}
								secondaryAction={
									<Stack
										spacing={0.5}
										id={index.toString()}
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
										primary={`1,700+ Reacte from the official websi Line item ${
											index + 1
										}`}
										secondary='19-10-2021'
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</Stack>
			</Box>
		</Box>
	);
}

export default TodoList;
