export const convertNumber = (number?: number) => {
  if (number) {
    let formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber;
  }
  return "...";
};
