import './BeverageCard.scss';

import React, { useState } /* , { useState, useEffect, useContext } */ from 'react';
// Define props type


type BeverageCardPropType= {
  imgSrc: string;
  name: string;
};


// Destructure the props
const BeverageCard = ({ imgSrc, name }: BeverageCardPropType): JSX.Element => {
  const [timeList, setTimeList] = useState<Array<string>>([]);

  return (
    <div className="BeverageCard">
      <button className="BeverageButton" type="button">
        <img className="BeverageImg" src={imgSrc} alt={name} />
      </button>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default BeverageCard;
