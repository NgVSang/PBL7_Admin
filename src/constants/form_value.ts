export const monthValue = () => {
  const data = [];
  for (let i = 1; i <= 31; i++) {
    data.push({
      value: i,
      label: i.toString(),
    });
  }
  return data;
};

export const weekValue = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];
