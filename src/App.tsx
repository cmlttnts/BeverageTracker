import React, { useState, useEffect, useRef } from 'react';
import BeverageCard from 'Components/BeverageCard/BeverageCard';
import ModalPopup from 'Components/ModalPopup/ModalPopup';
import { getLastSavedDay, getDayMonthYear, savedDay } from 'Helpers/TimeLib';

//where the beverage images imported and exported as array
import imageArray from 'ImageArray';
import 'main.scss';


const BEVERAGE_NAMES = [
  'Tea', 'Coffee', 'Turkish Coffee',
  'Espresso', 'Americano', 'Latte',
  'Macchiato', 'Cappucino', 'Mocha',
];

type BeverageType = {
  name: string;
  imgSrc: string;
};

/**
 * Combine names and images into beverage object array
 */
const BEVERAGE_LIST: Array<BeverageType> = BEVERAGE_NAMES.map(
  (name, index) => ({
    name,
    imgSrc: imageArray[index],
  }),
);

const App = (): JSX.Element => {

  const [searchText, setSearchText] = useState<string>('');
  const [dayChanged, setDayChanged] = useState<boolean>(false);

  const [popupActive, setPopupActive] = useState<boolean>(false);
  const message = useRef('');

  //Check if the last saved day is different than today, which will reset time lists
  //also save the day afterwards
  useEffect(() => {
    //we need to set dayChaned to true once, and set false after that render
    if (dayChanged) { setDayChanged(false); }

    if (!(getLastSavedDay() === getDayMonthYear())) {
      setDayChanged(true);
      savedDay();
    }
  }, [dayChanged]);

  //toggle popup window's class, animation shows up when active
  const handlePopup = (msg: string): void => {
    message.current = msg;
    if (msg === '') { setPopupActive(false); } else { setPopupActive(true); }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  /**
   * check if name of the beverage includes search substring case insensitive
   * @param beverage to be searched
   */
  function includesStr(beverage: BeverageType): boolean {
    return beverage.name.toLowerCase().includes(searchText.toLowerCase());
  }

  return (
    <div className="App">

      <h1>Beverage Tracker</h1>

      <label className="SearchArea" htmlFor="search">
        Search:
        <input className="SearchInput" type="text" name="search" id="search" onChange={handleChange} value={searchText} />
      </label>

      <div className="container">
        {BEVERAGE_LIST.map(
          (beverage) => (
            <BeverageCard
              imgSrc={beverage.imgSrc}
              name={beverage.name}
              popupCb={handlePopup}
              isMatch={includesStr(beverage)}
              key={beverage.name}
              isNewDay={dayChanged}
            />
          ),
        )}
      </div>

      <ModalPopup msg={message.current} isActive={popupActive} />

    </div>
  );
};

export default App;
