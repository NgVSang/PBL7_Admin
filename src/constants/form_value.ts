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

export const timeOptions = (
  startTime: string,
  endTime: string,
  interval: number
) => {
  const timeSlots = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    const formattedHour = currentHour.toString().padStart(2, "0");
    const formattedMinute = currentMinute.toString().padStart(2, "0");
    const timeSlot = `${formattedHour}:${formattedMinute}`;
    timeSlots.push({ value: timeSlot, label: timeSlot });

    // Increase time by interval
    currentMinute += interval;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute %= 60;
    }
  }

  return timeSlots;
};
