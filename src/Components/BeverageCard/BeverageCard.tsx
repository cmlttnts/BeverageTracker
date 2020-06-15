import React from 'react';
import useTimeList, { PopupCbType } from './useTimeList';
import './BeverageCard.scss';

// Define types
type BeverageCardPropType= {
  imgSrc: string;
  name: string;
  popupCb: PopupCbType;
  isMatch: boolean;
  shouldReset: boolean;
};

/**
 * Card style Container Component to display Beverages and their Time Lists
 * @param imgSrc source url for the image to be displayed on the card
 * @param name name of beverage as title and alt attribute for image
 * @param popupCb popup message function callback when the click is too fast
 * @param isMatch should display or not wrt search result
 * @param shouldReset should the list of times be removed
 */
const BeverageCard = ({
  imgSrc, name, popupCb, isMatch, shouldReset,
}: BeverageCardPropType): JSX.Element => {

  const [handleClick, timeList] = useTimeList(popupCb, name, shouldReset);

  return (
    <div className="BeverageCard" style={{ display: isMatch ? 'flex' : 'none' }}>
      <h4>{name}</h4>
      <div className="card-container">

        <button className="BeverageButton" type="button" onClick={handleClick}>
          <img className="BeverageImg" src={imgSrc} alt={name} />
        </button>
        <ul className="TimestampList">
          {timeList.map(
            (time) => (
              <li className={time.cName} key={time.id}>
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
