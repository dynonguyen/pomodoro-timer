import React from 'react';
import { changeAppTitle } from '../helpers';

function useChangeTitle(title: string): void {
	React.useEffect(() => {
		changeAppTitle(title);
	}, []);
	return;
}

export default useChangeTitle;
