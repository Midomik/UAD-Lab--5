import React, { useEffect } from 'react';
import css from './GamePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAnswer,
  selectDataGame,
  selectIsColorBlind,
  selectIsInGame,
  selectTimeMode,
  selectWords,
  selecttotalResult,
  selectvalueTimer,
} from 'redux/game/game.selectors';
import {
  addGameHistory,
  addLevel,
  changeAnswer,
  changeGameMode,
  changeIsColorBlind,
  changeLeftWord,
  changeRightWord,
  changeTimeMode,
  changeTotalResult,
  resetTimer,
  setLastLocation,
  startGame,
  updateTimer,
} from 'redux/game/game.reducer';
import { useLocation } from 'react-router-dom';

export const GamePage = () => {
  const dispatch = useDispatch();
  const isInGame = useSelector(selectIsInGame);
  const nameColorArr = useSelector(selectDataGame);
  let valueTimer = useSelector(selectvalueTimer);
  const resultLeftWord = useSelector(selectWords).leftWord;
  const resultRightWord = useSelector(selectWords).rightWord;
  const totalResult = useSelector(selecttotalResult);
  const answer = useSelector(selectAnswer);
  const isColorBlind = useSelector(selectIsColorBlind);
  const timeMode = useSelector(selectTimeMode);

  let timerId;
  let leftWord;
  let rightWord;

  const chekValueTimer = () => {
    valueTimer--;
    if (valueTimer <= 0) {
      clearInterval(timerId);
      console.log('Time is up!');

      dispatch(startGame());
      dispatch(changeLeftWord(''));
      dispatch(changeRightWord(''));
      dispatch(addGameHistory());
    }
  };

  const handlerStartBtn = () => {
    dispatch(startGame());
    changeColor();
    const handlerTimer = () => {
      chekValueTimer();
      dispatch(updateTimer());
    };
    valueTimer = Number(timeMode);
    dispatch(resetTimer());
    timerId = setInterval(handlerTimer, 1000);
  };

  const changeColor = () => {
    const getRandomId = () => {
      const id = Math.abs(Math.floor(Math.random() * nameColorArr.length - 1));
      return id;
    };
    const leftId = getRandomId();
    const rightId = getRandomId();

    leftWord = nameColorArr[leftId].name;
    rightWord = nameColorArr[getRandomId()].name;

    dispatch(changeLeftWord(leftWord));
    dispatch(changeRightWord(rightWord));
    dispatch(addLevel());

    document.getElementById('leftWordId').style.color = `${
      nameColorArr[getRandomId()].hex
    }`;

    document.getElementById(
      'rightWordId'
    ).style.color = `${nameColorArr[rightId].hex}`;

    const result = leftId === rightId ? true : false;

    dispatch(changeAnswer(result));

    return result;
  };
  const handlerAnswBtn = e => {
    changeColor();

    if (e.currentTarget.name === 'no' && answer === false) {
      dispatch(changeTotalResult(true));
    } else if (e.currentTarget.name === 'no' && answer === true) {
      dispatch(changeTotalResult(false));
    } else if (e.currentTarget.name === 'yes' && answer === true) {
      dispatch(changeTotalResult(true));
    } else if (e.currentTarget.name === 'yes' && answer === false) {
      dispatch(changeTotalResult(false));
    }
  };

  const location = useLocation();
  useEffect(() => {
    dispatch(setLastLocation(location));
  }, [dispatch, location]);
  return (
    <div className={css.main_game_container}>
      <h1 className={css.game_title}>
        Does the color name on the left match the text on the right?
      </h1>{' '}
      <div className={css.timer_container}>
        <p className={css.timer}>{valueTimer}</p>
      </div>
      {valueTimer === 0 && (
        <div className={css.main_result_container}>
          <div className={css.result_container}>
            <p className={css.true_result}>Correct: {totalResult.true}</p>
            <p className={css.false_result}>Incorrect: {totalResult.false}</p>
          </div>

          <div className={css.progress_container}>
            <progress
              className={css.progress_bar}
              value={totalResult.true}
              max={totalResult.false + totalResult.true}
            ></progress>
          </div>
        </div>
      )}
      {isInGame === false && (
        <>
          <div className={css.game_time_container}>
            <div className={css.select_mode_container}>
              Select Game Mode:
              <select
                onClick={e => dispatch(changeGameMode(e.target.value))}
                className={css.select_mode}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <p className={css.game_time_title}>Game Time:</p>

              <div>
                <input
                  onClick={e =>
                    dispatch(changeTimeMode(Number(e.currentTarget.value)))
                  }
                  type="radio"
                  id="first"
                  name="drone"
                  value="30"
                  defaultChecked
                />
                <label htmlFor="huey">30 sec</label>
              </div>

              <div>
                <input
                  onClick={e =>
                    dispatch(changeTimeMode(Number(e.currentTarget.value)))
                  }
                  type="radio"
                  id="second"
                  name="drone"
                  value="60"
                />
                <label htmlFor="dewey">60 sec</label>
              </div>
            </div>
          </div>
          <div className={css.test_for_daltonism_container}>
            <input
              onClick={e =>
                dispatch(changeIsColorBlind(e.currentTarget.checked))
              }
              className={css.test_for_daltonism}
              type="checkbox"
              defaultChecked={isColorBlind}
            />
            <p className={css.test_for_daltonism_text}>
              {' '}
              Confirm that you are not color blind or simply blind
            </p>
          </div>
        </>
      )}
      {isInGame === false && (
        <>
          <button
            disabled={!isColorBlind}
            onClick={handlerStartBtn}
            className={css.start_btn}
          >
            Play
          </button>
        </>
      )}
      <div className={css.color_container}>
        <div id="leftWordId" className={css.left_color_title}>
          {resultLeftWord}
        </div>
        <div id="rightWordId" className={css.right_color}>
          {resultRightWord}
        </div>
      </div>
      {isInGame === true && (
        <>
          <div className={css.control_container}>
            <button onClick={handlerAnswBtn} name="yes" className={css.btn_yes}>
              Yes
            </button>
            <button onClick={handlerAnswBtn} name="no" className={css.btn_no}>
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
};
