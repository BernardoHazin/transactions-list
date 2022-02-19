export const fromDate = (date: Date) => {
  return new Date(date);
};

export const addMonth = (date: Date, n: number) => {
  date.setMonth(date.getMonth() + n);
};
