export interface PomodoroModel {
	uid: string;
	createdDate: string;
	time: number; // minutes
	taskId?: string | null;
}
