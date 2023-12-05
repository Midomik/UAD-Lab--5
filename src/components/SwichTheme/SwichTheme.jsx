import React from 'react';

import { swichToggle } from 'redux/game/game.reducer';
import { useDispatch } from 'react-redux';

const SwichTheme = () => {
  const dispatch = useDispatch();
  const hendlerClick = e => {
    dispatch(swichToggle());
    e.currentTarget.classList.toggle('active');
    document.getElementById('main_container').classList.toggle('active');
  };

  return (
    <div className="main_container_toggle">
      <div id="toggle_button" onClick={hendlerClick} className="toggle_button">
        <div className="inner_circle"></div>
      </div>
      <p className="togle_title">Dark/White</p>
    </div>
  );
};

export default SwichTheme;
