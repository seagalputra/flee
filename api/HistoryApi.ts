const getHistories = (): Promise<any> => {
  const data = [
    { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
    {
      title: 'J',
      data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'],
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
};

export { getHistories };
