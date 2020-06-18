import React, { useState, useEffect, useRef } from 'react';
import BeverageCard from 'Components/BeverageCard/BeverageCard';
import ModalPopup from 'Components/ModalPopup/ModalPopup';
import { BEVERAGE_LIST } from 'beverageList';

import { getLastSavedDay, getDayMonthYear, savedDay } from 'Helpers/TimeLib';
import includesStr from 'Helpers/StringLib';
import 'main.scss';
import Footer from 'Components/Footer/Footer';

/**
 * Top Level Component
 */
const App = (): JSX.Element => {
  //Hold search input state
  const [searchText, setSearchText] = useState<string>('');
  const [needsReset, setNeedsReset] = useState<boolean>(false);
  //if multiple clicks happen very quickly, popup message needs to be active
  const [popupActive, setPopupActive] = useState<boolean>(false);
  const message = useRef('');

  //Check if the last saved day is different than today, which will reset time lists
  //also save the day afterwards
  useEffect(() => {
    //we need to set it to true once, and set false after that render
    //otherwise every render it resets
    if (needsReset) { setNeedsReset(false); }

    if (!(getLastSavedDay() === getDayMonthYear())) {
      setNeedsReset(true);
      savedDay();
    }
  }, [needsReset]);

  //toggle popup window's class, animation shows up when active
  const handlePopup = (msg: string): void => {
    message.current = msg;
    if (msg === '') { setPopupActive(false); } else { setPopupActive(true); }
  };

  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  const handleReset = (): void => {
    setNeedsReset(true);
  };

  return (
    <div className="App">

      <h1>Beverage Tracker</h1>

      <label className="SearchArea" htmlFor="search">
        Search:
        <input className="SearchInput" type="text" name="search" id="search" onChange={handleSeachChange} value={searchText} />
      </label>

      <div className="container">
        {BEVERAGE_LIST.map(
          (beverage) => (
            <BeverageCard
              imgSrc={beverage.imgSrc}
              name={beverage.name}
              popupCb={handlePopup}
              isMatch={includesStr(beverage.name, searchText)}
              key={beverage.name}
              shouldReset={needsReset}
            />
          ),
        )}
      </div>
      <button type="button" className="ResetButton" onClick={handleReset}>Reset All</button>
      <ModalPopup msg={message.current} isActive={popupActive} />
      <Footer />
    </div>
  );
};

export default App;
