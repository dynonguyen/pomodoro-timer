import useTimeQuote, { TimeQuote } from '../../hooks/useTimeQuote';
import useStyles from '../../styles/Quote';

function Quote() {
	const { time, date, quote, quoteBg }: TimeQuote = useTimeQuote();
	const classes = useStyles({ quoteBg });

	return (
		<div className={`${classes.root} wh-100 flex-center-ver`}>
			<div className={classes.timeWrap}>
				<div className='time'>{time}</div>
				<div className='date'>{date}</div>
			</div>

			<div className={classes.break}></div>

			<div>
				<p className={classes.quote}>{`"${quote.content}"`}</p>
				<div className={classes.author}>{`- ${quote.author}`}</div>
			</div>
		</div>
	);
}

export default Quote;
