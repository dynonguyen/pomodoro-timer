export interface TaskModel {
	id?: string;
	uid: string;
	label: string;
	desc?: string;
	pomodoroTime?: number;
	isCompleted: boolean;
	createdDate: string;
}
