import './ModalPopup.scss';

import React from 'react';


// Define props type
type ModalPopupPropType= {
  msg: string;
  isActive: boolean;
};

const ModalPopup = ({ msg, isActive }: ModalPopupPropType): JSX.Element => {

  return <div className={`ModalPopup${isActive ? ' ActivePopup' : ''}`}>{msg}</div>;
};

export default React.memo(ModalPopup);
