import React, { useEffect } from 'react';
import css from './GameResult.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameHistory } from 'redux/game/game.selectors';
import { useLocation } from 'react-router-dom';
import { setLastLocation } from 'redux/game/game.reducer';

const GameResult = () => {
  const history = useSelector(selectGameHistory);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setLastLocation(location));
  }, [dispatch, location]);
  return (
    <div className={css.main_container_results}>
      <ul className={css.history_list}>
        {history !== null &&
          history.map((item, index) => {
            return (
              <li key={index} className={css.history_item}>
                <p className={css.index_result}>{index + 1}</p>
                <div className={css.results_container}>
                  <p className={css.true_result}>
                    <span className={css.correct_prev_title}>Correct:</span>{' '}
                    {item.true}
                  </p>
                  <p className={css.false_result}>
                    <span className={css.incorrect_prev_title}>Incorrect:</span>{' '}
                    {item.false}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GameResult;
