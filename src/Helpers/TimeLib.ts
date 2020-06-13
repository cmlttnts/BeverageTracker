/**
 * returns string which is current hour and min concatanated with dot
 */
export function getHourAndMin(): string {
  const curDate = new Date();
  const curHourAndMin = `${curDate.getHours()}. ${curDate.getMinutes()}`;
  return curHourAndMin;
}
/**
 * returns if the hour is after midnight
 */

export function isDayChange(curHour: number): boolean {
  return curHour === 0;
}


/**
 * returns unique id to use as a key in array expansions in JSX
 */

export function getUniqueId(): string {
  const date = new Date();
  return date.getTime().toString();
}
