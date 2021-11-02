import { useEffect, useState } from 'react';
import { Quote, QUOTES, QUOTE_BG } from '../constants/quotes';

export interface TimeQuote {
  time: string;
  date: string;
  quoteBg: string;
  quote: Quote;
}

function getCurrentDateString(): string {
  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

function getCurrentTimeString(): string {
  const now = new Date();
  const h = `0${now.getHours()}`.slice(-2);
  const m = `0${now.getMinutes()}`.slice(-2);

  return `${h}:${m}`;
}

function randomQuote() {
  const quoteLen = QUOTES.length;
  const bgLen = QUOTE_BG.length;

  return {
    quote: QUOTES[~~(Math.random() * quoteLen)],
    quoteBg: QUOTE_BG[~~(Math.random() * bgLen)],
  };
}

function useTimeQuote(): TimeQuote {
  const [time, setTime] = useState<string>(getCurrentTimeString);
  const [quoteInfo, setQuoteInfo] = useState(randomQuote);
  const { quoteBg, quote } = quoteInfo;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTimeString());
      setQuoteInfo(randomQuote());
    }, 60_000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  return {
    time,
    date: getCurrentDateString(),
    quote,
    quoteBg,
  };
}

export default useTimeQuote;
