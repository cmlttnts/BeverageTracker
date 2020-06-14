import { useState, useRef, useEffect } from 'react';
import {
  getHourAndMin, getUniqueId, getTimeInSecs,
} from 'Helpers/TimeLib';

export type PopupCbType = (msg: string) => void;


/**
 * @param text: hour.minute string
 * @param id: unique id for JSX array expansion
 * @param cName: class name for styling
 */
type TimeType = {
  text: string;
  id: string;
  cName: string;
};

function startList(name: string): Array<TimeType> {
  const stored = localStorage.getItem(name);
  if (stored) return JSON.parse(stored);
  return [];
}


const clickDebounceInSec = 60; //60 seconds for now
let popupActive = true;


/**
 * custom hook, returns click event handler and array of Time Objects
 */
function useTimeList(
  popupCb: PopupCbType,
  beverageName: string,
  isNewDay: boolean,
): [() => void, TimeType[]] {

  const [timeList, setTimeList] = useState<Array<TimeType>>(startList(beverageName));
  const prevTime = useRef(0);

  //Update local stoage if list of times changes
  useEffect(() => {
    localStorage.setItem(beverageName, JSON.stringify(timeList));
  }, [timeList, beverageName]);

  //Reset the local storage at midnight so new day starts with empty list
  useEffect(() => {

    if (isNewDay) {
      localStorage.setItem(beverageName, JSON.stringify([]));
      setTimeList([]);

    }


  }, [beverageName, isNewDay]);


  /**
   * pushes a new Time Object to timeList
   */
  const handleClick = (): void => {

    const now = getTimeInSecs();
    if (now - prevTime.current < clickDebounceInSec) {
      if (popupActive) {
        popupActive = false;
        popupCb('You are clicking too fast, wait for the next minute');
        setTimeout(
          () => { popupCb(''); },
          2000,
        );
      }
      return;
    }
    prevTime.current = now;
    const newTimeList = [...timeList];
    popupActive = true;
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
