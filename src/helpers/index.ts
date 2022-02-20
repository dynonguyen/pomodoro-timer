import { ROUTES } from '../constants/routes';

export function getActiveKey(menuList: any, pathname: string): string {
	if (pathname === ROUTES.HOME) return ROUTES.HOME;

	let activeKey: string = '';
	menuList.forEach((item: any) => {
		if (
			item.activeKey !== ROUTES.HOME &&
			pathname.indexOf(item.activeKey.slice(1)) !== -1
		)
			activeKey = item.activeKey;
	});
	return activeKey;
}

export function formatDate(date: Date = new Date()): string {
	const y: number = date.getFullYear();
	const m: number = date.getMonth() + 1;
	const d: number = date.getDate();

	const dStr = `0${d.toString()}`.slice(-2);
	const mStr = `0${m.toString()}`.slice(-2);

	return `${dStr}-${mStr}-${y}`;
}

export function changeAppTitle(newTitle: string): void {
	document.title = `${newTitle} | Dyno Timer`;
}
