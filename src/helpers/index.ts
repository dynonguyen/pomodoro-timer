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
