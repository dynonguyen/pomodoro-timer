import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import ReactTooltip from 'react-tooltip';
import useMobile from '../../hooks/useMobile';
import { PomodoroModel } from '../../models/pomodoro.model';

type ActivityCalendarType = {
	count: number;
	date: string;
	level: 0 | 1 | 2 | 3 | 4;
};

interface ActivityFocusCalendarProps {
	data: ActivityCalendarType[];
	[options: string]: any;
}

interface CalendarProps {
	userData: PomodoroModel[];
}

// Date to ISO 8601 format: yyyy-MM-DD
function iso8601DateFormat(date: Date): string {
	const y = date.getFullYear();
	const m = `0${date.getMonth() + 1}`.slice(-2);
	const d = `0${date.getDate()}`.slice(-2);
	return `${y}-${m}-${d}`;
}

function generateFullDate(): ActivityCalendarType[] {
	const result: ActivityCalendarType[] = [];
	const now = new Date(`01-01-${new Date().getFullYear()}`).getTime();
	for (let i = 0; i < 365; ++i) {
		result.push({
			count: 0,
			date: iso8601DateFormat(new Date(now + i * 8_6400_000)),
			level: 0,
		});
	}
	return result;
}

function compareDate(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

function calculateFocused(userData: PomodoroModel[]): ActivityCalendarType[] {
	const data: ActivityCalendarType[] = generateFullDate();
	userData.forEach((item) => {
		for (const d of data) {
			if (compareDate(new Date(item.createdDate), new Date(d.date))) {
				d.count += item.time;
				break;
			}
		}
	});

	const maxCount = Math.max(...data.map((i) => i.count));
	if (maxCount) {
		data.forEach((d) => {
			const rate = d.count / maxCount;
			if (rate == 0) {
				d.level = 0;
			} else if (rate < 0.2) {
				d.level = 1;
			} else if (rate < 0.5) {
				d.level = 2;
			} else if (rate < 0.75) {
				d.level = 3;
			} else {
				d.level = 4;
			}
		});
	}

	return data;
}

function ActivityFocusCalendar(props: ActivityFocusCalendarProps) {
	const { data, ...options } = props;
	return (
		<ActivityCalendar
			data={data}
			theme={{
				level0: '#ddf4f4',
				level1: '#abe088',
				level2: '#84d26f',
				level3: '#3ca040',
				level4: '#3c825d',
			}}
			labels={{
				totalCount: '{{count}} minutes focused in {{year}}',
				months: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec',
				],
			}}
			{...options}
		>
			<ReactTooltip html />
		</ActivityCalendar>
	);
}

function Calendar({ userData }: CalendarProps) {
	const data = calculateFocused(userData);
	const isMdDevice = useMobile('md');

	// change calendar tooltip
	useEffect(() => {
		document.querySelectorAll('[data-tip*=contributions]').forEach((doc) => {
			doc.setAttribute(
				'data-tip',
				doc
					.getAttribute('data-tip')
					?.replace('contributions', 'minutes focused') || '',
			);
		});
		return () => {};
	}, []);

	return (
		<>
			{isMdDevice ? (
				<>
					<ActivityFocusCalendar
						data={data.filter((_, index) => index < data.length / 2)}
						hideColorLegend={true}
						hideMonthLabels={true}
					/>
					<Box mt={4}>
						<ActivityFocusCalendar
							data={data.filter((_, index) => index >= data.length / 2)}
						/>
					</Box>
				</>
			) : (
				<ActivityFocusCalendar data={data} />
			)}
		</>
	);
}

export default Calendar;
