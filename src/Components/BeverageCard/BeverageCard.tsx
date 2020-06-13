import React, { useState } from 'react';
import { getHourAndMin, getUniqueId } from 'Helpers/TimeLib';
import './BeverageCard.scss';


// Define types
type BeverageCardPropType= {
  imgSrc: string;
  name: string;
};

/**
 * @param text: hour.minute string
 * @param id: unique id for JSX array expansion
 */
type TimeType = {
  text: string;
  id: string;
};

/**
 * custom hook, returns click event handler and array of Time Objects
 */
function useTimeList(): [() => void, TimeType[]] {
  const [timeList, setTimeList] = useState<Array<TimeType>>([]);

  /**
   * pushes a new Time Object to timeList
   */
  const handleClick = (): void => {
    const newTimeList = [...timeList];
    newTimeList.push(
      {
        text: getHourAndMin(),
        id: getUniqueId(),
      },
    );
    setTimeList(newTimeList);
  };

  return [handleClick, timeList];
}


/**
 * Card styled Container Component to display Beverages and their Time Trackers
 * @param imgSrc: source url for the image to be displayed on the card
 * @param name: name of beverage as title and alt attiribute for image
 */
const BeverageCard = ({ imgSrc, name }: BeverageCardPropType): JSX.Element => {
  const [handleClick, timeList] = useTimeList();

  return (
    <div className="BeverageCard">
      <h4>{name}</h4>
      <div className="card-container">

        <button className="BeverageButton" type="button" onClick={handleClick}>
          <img className="BeverageImg" src={imgSrc} alt={name} />
        </button>
        <ul className="TimestampList">
          {timeList.map(
            (time) => (
              <li key={time.id}>
                {time.text}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default BeverageCard;
