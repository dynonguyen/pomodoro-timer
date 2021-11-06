export interface Quote {
	content: string;
	author: string;
}

export const QUOTE_BG: Array<string> = Array.from(
	{ length: 7 },
	(_, index) =>
		`https://res.cloudinary.com/dynonary/image/upload/v1635848061/dyno-timer/quote-bg/bg-${
			index + 1
		}.jpg`,
);

export const QUOTES: Array<Quote> = [
	{
		content: 'Don’t cry because it’s over, smile because it happened.',
		author: 'Dr. Seuss',
	},
	{
		content: 'You only live once, but if you do it right, once is enough.',
		author: 'Mae West',
	},
	{
		content:
			'Good friends, good books, and a sleepy conscience: this is the ideal life.',
		author: 'Mark Twain',
	},
	{
		content: 'Life is what happens to us while we are making other plans.',
		author: 'Allen Saunders',
	},
	{
		content:
			'Today you are You, that is truer than true. There is no one alive who is Youer than You.',
		author: 'Dr. Seuss',
	},
	{
		content:
			'If you want to go fast, go alone. If you want to go far, go together.',
		author: 'African proverb',
	},
	{
		content: 'It’s OK to not be OK, as long as you don’t stay that way.',
		author: 'Anonymous',
	},
	{
		content:
			'Nothing in life is to be feared; it is only to be understood. Now is the time to understand more so that we may fear less.',
		author: 'Marie Curie',
	},
	{
		content: 'Not how long, but how well you have lived is the main thing.',
		author: 'Seneca',
	},
	{
		content: 'Life is short, smile while you still have teeth.',
		author: 'Anonymous',
	},
];
