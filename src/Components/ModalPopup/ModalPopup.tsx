import './ModalPopup.scss';

import React from 'react';


// Define props type
type ModalPopupPropType= {
  msg: string;
  isActive: boolean;
};

const ModalPopup = ({ msg, isActive }: ModalPopupPropType): JSX.Element => {

  const newClassName = isActive ? ' ActivePopup' : '';

  return <div className={`ModalPopup${newClassName}`}>{msg}</div>;
};

export default React.memo(ModalPopup);
// export default ModalPopup;
