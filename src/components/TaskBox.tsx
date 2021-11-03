import { Box, Typography, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface TaskLabel {
  id: number;
  label: string;
  desc?: string;
}

interface Todo {
  id: number;
  label: string;
  isCompleted: boolean;
}

const taskLableList: Array<TaskLabel> = [
  {
    id: 0,
    label: 'Lập trình web',
  },
  {
    id: 1,
    label: 'English',
  },
];

const todoList: Array<Todo> = [
  {
    id: 0,
    label: 'Học Typescript',
    isCompleted: false,
  },
];

function TaskBox() {
  const theme = useTheme();

  return (
    <Box p={2} className="wh-100 flex-center flex-col">
      <Typography
        color={theme.palette.text.primary}
        variant="h5"
        component="h5"
        sx={{ textAlign: 'center' }}
      >
        Task
      </Typography>

      <Box my={2} className="w-100">
        <FormControl fullWidth>
          <Select
            variant="outlined"
            displayEmpty
            id="musicSelect"
            size="small"
            value={-1}
          >
            <MenuItem disabled value={-1}>
              <em>Choose a task label</em>
            </MenuItem>

            {taskLableList.map((taskLabel) => (
              <MenuItem key={taskLabel.id} value={taskLabel.id}>
                {taskLabel.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FormControl fullWidth>
        <Select
          variant="outlined"
          displayEmpty
          id="musicSelect"
          size="small"
          value={-1}
        >
          <MenuItem disabled value={-1}>
            <em>Choose a todo</em>
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
