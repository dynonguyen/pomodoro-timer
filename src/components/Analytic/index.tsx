import { Box, Typography } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../configs/firebase';
import { AccountContext } from '../../contexts/AccountContext';
import { PomodoroModel } from '../../models/pomodoro.model';
import ActivitySummary from './ActivitySummary';
import Calendar from './Calendar';

function Analytic() {
	const [userData, setUserData] = useState<PomodoroModel[]>([]);
	const { uid } = useContext(AccountContext);

	useEffect(() => {
		let isSubscribe = true;

		(async function () {
			const q = query(collection(db, 'pomodoros'), where('uid', '==', uid));
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty && isSubscribe) {
				const newData: PomodoroModel[] = [];
				querySnapshot.forEach((doc) =>
					newData.push(doc.data() as PomodoroModel),
				);
				setUserData([...newData]);
			}
		})();

		return () => {
			isSubscribe = false;
		};
	}, []);

	return (
		<Box p={2} className='box'>
			<Typography
				variant='h3'
				textAlign='center'
				mb={3}
				color='GrayText'
				sx={{ textTransform: 'uppercase' }}
				component='h1'
			>
				Dyno Timer Report
			</Typography>

			<ActivitySummary data={userData} />

			<Box mt={4}>
				<Calendar userData={userData} />
			</Box>
		</Box>
	);
}

export default Analytic;
