import { useEffect, useState } from 'react';

export type History = {
  title: string;
  data: Array<string>;
};

const data: History[] = [
  { title: '28 Feb 2021', data: ['Devin', 'Dan', 'Dominic'] },
  {
    title: '27 Feb 2021',
    data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'],
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
