export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");

export const generateUuid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

/**
 * Returns count of weeks for year and month
 *
 * @param {Number} year - full year (2024)
 * @param {Number} month_number - month_number is in the range 1..12
 * @returns {number}
 */
export const weeksCount = (month_number: number): number => {
  const year = new Date().getFullYear();
  const firstOfMonth = new Date(year, month_number - 1, 1);
  let day = firstOfMonth.getDay() || 6;
  day = day === 1 ? 0 : day;
  if (day) {
    day--;
  }
  let diff = 7 - day;
  const lastOfMonth = new Date(year, month_number, 0);
  const lastDate = lastOfMonth.getDate();
  if (lastOfMonth.getDay() === 1) {
    diff--;
  }
  const result = Math.ceil((lastDate - diff) / 7);
  return result + 1;
};
