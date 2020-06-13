import React, { useState } from 'react';
import BeverageCard from 'Components/BeverageCard/BeverageCard';
import 'main.scss';
//where the beverage images imported and exported as array
import imageArray from 'ImageArray';

const BEVERAGE_LIST = [
  'Tea', 'Coffee', 'Turkish Coffee',
  'Soda', 'Coke', 'Lemonade',
  'Orange Juice', 'Hot Beverage', 'Water',
];


const App = (): JSX.Element => {

  const [searchText, setSearchText] = useState<string>('');

  //just update the state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };
  /**
   * check if string includes substring case insensitive
   * @param beverageName: name to be searched
   */
  function includesStr(beverageName: string): boolean {
    return beverageName.toLowerCase().includes(searchText.toLowerCase());
  }

  return (
    <div className="App">
      <h1>Beverage Tracker</h1>
      <label htmlFor="search">
        Search
        <input type="text" name="search" id="search" onChange={handleChange} value={searchText} />
      </label>
      <div className="container">

        {BEVERAGE_LIST.filter(includesStr).map(
          (beverage, index) => (
            <BeverageCard
              imgSrc={imageArray[index]}
              name={beverage}
              key={beverage}
            />
          ),
        )}

      </div>
    </div>
  );
};

export default App;
