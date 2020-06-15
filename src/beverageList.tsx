//where the beverage images imported and exported as array
import imageArray from 'ImageArray';


const BEVERAGE_NAMES = [
  'Tea', 'Coffee', 'Turkish Coffee',
  'Espresso', 'Americano', 'Latte',
  'Macchiato', 'Cappucino', 'Mocha',
];

export type BeverageType = {
  name: string;
  imgSrc: string;
};

/**
 * Combine names and images into beverage objects array
 */
export const BEVERAGE_LIST: Array<BeverageType> = BEVERAGE_NAMES.map(
  (name, index) => ({
    name,
    imgSrc: imageArray[index],
  }),
);
