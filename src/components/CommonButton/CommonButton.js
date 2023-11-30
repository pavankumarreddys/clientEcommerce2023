import React, { useState } from 'react';
import './CommonButton.css'
const CommonButton = () => {
  const [buttonState, setButtonState] = useState('submit');

  const handleClick = () => {
    setButtonState('process');
    setTimeout(() => {
      setButtonState('submitted');
    }, 5000);
  };

  return (
    <button
      id="btn"
      className={`submit-pavan ${buttonState === 'process' ? 'process-pavan' : ''} ${
        buttonState === 'submitted' ? 'submitted-pavan' : ''
      }`}
      onClick={handleClick}
    >
      {buttonState === 'submit' && 'Submit'}
      {buttonState === 'process' && 'Processing'}
      {buttonState === 'submitted' && (
        <>
          <span className="tick-pavan">&#10004;</span>
          Submitted
        </>
      )}
    </button>
  );
};

export default CommonButton