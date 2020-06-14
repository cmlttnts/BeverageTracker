import React, { useState, useEffect } from 'react';
import BeverageCard from 'Components/BeverageCard/BeverageCard';
import ModalPopup from 'Components/ModalPopup/ModalPopup';

//where the beverage images imported and exported as array
import imageArray from 'ImageArray';
import 'main.scss';
import { getLastSavedDay, getDayMonthYear, savedDay } from 'Helpers/TimeLib';


const BEVERAGE_NAMES = [
  'Tea', 'Coffee', 'Turkish Coffee',
  'Espresso', 'Americano', 'Latte',
  'Macchiato', 'Cappucino', 'Mocha',
];

type BeverageType = {
  name: string;
  imgSrc: string;
};


const BEVERAGE_LIST: Array<BeverageType> = BEVERAGE_NAMES.map(
  (name, index) => ({
    name,
    imgSrc: imageArray[index],
  }),
);

const App = (): JSX.Element => {

  const [searchText, setSearchText] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [popupActive, setPopupActive] = useState<boolean>(false);
  const [dayChanged, setDayChanged] = useState<boolean>(false);

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
    setMessage(msg);
    if (msg === '') { setPopupActive(false); } else { setPopupActive(true); }
  };

  //just update the state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };
  /**
   * check if name of the beverage includes search substring case insensitive
   * @param beverage: to be searched
   */
  function includesStr(beverage: BeverageType): boolean {
    return beverage.name.toLowerCase().includes(searchText.toLowerCase());
  }

  return (
    <div className="App">
      <h1>Beverage Tracker</h1>
      <label className="SearchArea" htmlFor="search">
        Search:
        <input type="text" name="search" id="search" onChange={handleChange} value={searchText} />
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
      <ModalPopup msg={message} isActive={popupActive} />
    </div>
  );
};

export default App;
