import React, { createContext, ReactNode, useState } from 'react';

interface TaskBoxContextProps {
	children: ReactNode;
}

interface TaskBoxContextValue {
	isDisabled: boolean;
	taskId?: string | null;
	toggleIsDisabled: (isDisabled: boolean) => void;
	setTask: (taskId: string) => void;
}

const defaultValue: TaskBoxContextValue = {
	isDisabled: false,
	taskId: null,
	toggleIsDisabled: () => {},
	setTask: () => {},
};

export const TaskBoxContext = createContext<TaskBoxContextValue>(defaultValue);

function TaskBoxProvider(props: TaskBoxContextProps) {
	const { children } = props;
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [taskId, setTaskId] = useState<string | null>(null);

	const toggleIsDisabled = (value: boolean = false) => setIsDisabled(value);
	const setTask = (id: string) => setTaskId(id);

	const taskBoxContextData: TaskBoxContextValue = {
		isDisabled,
		taskId,
		toggleIsDisabled,
		setTask,
	};

	return (
		<TaskBoxContext.Provider value={taskBoxContextData}>
			{children}
		</TaskBoxContext.Provider>
	);
}

export default TaskBoxProvider;
