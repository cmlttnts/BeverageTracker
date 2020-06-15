import { useState, useRef, useEffect } from 'react';

import {
  getHourAndMin, getUniqueId, getTimeInSecs,
} from 'Helpers/TimeLib';

export type PopupCbType = (msg: string) => void;

/**
 * @param text hour.minute string
 * @param id unique id for JSX array expansion
 * @param cName class name for styling
 */
type TimeType = {
  text: string;
  id: string;
  cName: string;
};
/**
 * Return the saved list from local storage if exists or empty list
 * @param name name of the beverage as a key to check local storage
 */
function startList(name: string): Array<TimeType> {
  const stored = localStorage.getItem(name);
  if (stored) return JSON.parse(stored);
  return [];
}

//How many seconds to reclick
const clickDebounceInSec = 60; //60 seconds for now

/**
 * custom hook, returns click event handler and array of Time Objects
 */
function useTimeList(
  popupCb: PopupCbType,
  beverageName: string,
  shouldReset: boolean,
): [() => void, TimeType[]] {

  const [timeList, setTimeList] = useState<Array<TimeType>>(startList(beverageName));
  const prevTime = useRef(0);
  const popupDone = useRef(false);
  //Update local stoage if list of times changes
  useEffect(() => {
    localStorage.setItem(beverageName, JSON.stringify(timeList));
  }, [timeList, beverageName]);

  //Reset the local storage at midnight so new day starts with empty list
  useEffect(() => {

    if (shouldReset) {
      localStorage.setItem(beverageName, JSON.stringify([]));
      setTimeList([]);
    }
  }, [beverageName, shouldReset]);


  /**
   * pushes a new Time Object to timeList
   */
  const handleClick = (): void => {

    const now = getTimeInSecs();
    if (now - prevTime.current < clickDebounceInSec) {
      if (!popupDone.current) {
        popupDone.current = true;
        popupCb(`You can add time once a ${clickDebounceInSec} sec`);
        setTimeout(
          () => { popupCb(''); },
          2000,
        );
      }
      return;
    }
    popupDone.current = false;
    prevTime.current = now;
    const newTimeList = [...timeList];
    newTimeList.push({
      text: getHourAndMin(),
      id: getUniqueId(),
      cName: '',
    });
    //change the style of the item one before last one
    //We should also give new id so that React doesn't optimize re render
    if (newTimeList.length > 1) {
      newTimeList[newTimeList.length - 2] = {
        //One before last in the new list is the last one in the previous list
        text: timeList[timeList.length - 1].text,
        id: `${getUniqueId()}a`,
        cName: 'Striked',
      };
    }

    setTimeList(newTimeList);
  };

  return [handleClick, timeList];
}


export default useTimeList;
