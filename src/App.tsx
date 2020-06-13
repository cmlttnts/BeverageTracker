import React, { useState } from 'react';
import BeverageCard from 'Components/BeverageCard/BeverageCard';
import 'main.scss';
//where the beverage images imported and exported as array
import imageArray from 'ImageArray';

const BEVERAGE_NAMES = [
  'Tea', 'Coffee', 'Turkish Coffee',
  'Soda', 'Coke', 'Lemonade',
  'Orange Juice', 'Hot Beverage', 'Water',
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
      <label htmlFor="search">
        Search
        <input type="text" name="search" id="search" onChange={handleChange} value={searchText} />
      </label>
      <div className="container">

        {BEVERAGE_LIST.filter(includesStr).map(
          (beverage) => (
            <BeverageCard
              imgSrc={beverage.imgSrc}
              name={beverage.name}
              key={beverage.name}
            />
          ),
        )}

      </div>
    </div>
  );
};

export default App;
