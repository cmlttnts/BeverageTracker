import React from 'react';
import BeverageCard from 'Components/BeverageCard/BeverageCard';
import tea from 'Images/tea.jpg';
import 'main.scss';

const App = (): JSX.Element => (
  <div className="App">
    <div className="container">
      <BeverageCard imgSrc={tea} name="Tea0" />
      <BeverageCard imgSrc={tea} name="Tea1" />
      <BeverageCard imgSrc={tea} name="Tea2" />
      <BeverageCard imgSrc={tea} name="Tea3" />
    </div>
  </div>
);

export default App;
