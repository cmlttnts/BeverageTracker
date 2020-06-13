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
 * get time in milliseconds from 1970
 */
export function getTimeInMins(): number {
  //now() returns milliseconds =>  x1000 to sec => x60 to minute
  return Date.now() / 6000;
}

/**
 * returns unique id to use as a key in array expansions in JSX
 */

export function getUniqueId(): string {
  return Date.now().toString();
}
