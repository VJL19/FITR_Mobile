const getCurrentDate = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const getTime = new Date().toLocaleString().slice(10, 30);
  return `${todayDate} ${getTime}`;
};

export const advanceSessionEnd = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const todayDate = date.toISOString().slice(0, 10);
  const getTime = new Date().toLocaleString().slice(10, 30);
  return `${todayDate} ${getTime}`;
};
export const advanceMonthlyEnd = () => {
  let date = new Date();
  date.setMonth(date.getMonth() + 1);
  const todayDate = date.toISOString().slice(0, 10);
  const getTime = new Date().toLocaleString().slice(10, 30);
  return `${todayDate} ${getTime}`;
};

export default getCurrentDate;
