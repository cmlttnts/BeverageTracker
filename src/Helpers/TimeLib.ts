/**
 * returns string which is current hour and min concatanated with dot
 */
const padChar = '0';
const padCount = 2;
export function getHourAndMin(): string {
  const curDate = new Date();
  const curHour = curDate.getHours().toString().padStart(padCount, padChar);
  const curMin = curDate.getMinutes().toString().padStart(padCount, padChar);
  const curHourAndMin = `${curHour}.${curMin}`;
  return curHourAndMin;
}
/**
 * returns the date as Day/Month/Year
 */
export function getDayMonthYear(): string {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}


/**
 * get time in seconds from 1970
 */
export function getTimeInSecs(): number {
  //now() returns milliseconds =>  x1000 to secs
  return Date.now() / 1000;
}

/**
 * returns unique id to use as a key in array expansions in JSX
 * unique id is milliseconds from Unix Epoch
 */

export function getUniqueId(): string {
  return Date.now().toString();
}


const LAST_DAY_KEY = 'LastSavedDay';
export function getLastSavedDay(): string {

  return localStorage.getItem(LAST_DAY_KEY) || '';
}


export function savedDay(): void {
  localStorage.setItem(LAST_DAY_KEY, getDayMonthYear());
}
