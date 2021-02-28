import { useEffect, useState } from 'react';

export type History = {
  title: string;
  data: Array<Run>;
};

export type Run = {
  time: number;
  distance: number;
  calories: number;
};

const data: History[] = [
  {
    title: 'Feb 28, 2021',
    data: [
      { time: 600, distance: 5, calories: 10 },
      { time: 300, distance: 5, calories: 10 },
    ],
  },
];

const useHistoryApi = (): History[] => {
  const initialHistory: History[] = [];
  const [histories, setHistories]: [
    History[],
    React.Dispatch<React.SetStateAction<History[]>>,
  ] = useState(initialHistory);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHistories(data);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return histories;
};

export default useHistoryApi;
