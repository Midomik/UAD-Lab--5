import { createSlice } from '@reduxjs/toolkit';
import {
  colorForEasyModeGame,
  colorForHardModeGame,
  colorForMediumModeGame,
} from 'pages/gameData/gameData';

const gameInitialState = {
  theme: false,
  isInGame: false,
  valueTimer: 30,
  gameMode: 'easy',
  timeMode: '30',
  isColorBlind: false,
  dataGame: colorForEasyModeGame,
  numberOfLevel: 0,
  words: {
    leftWord: '',
    rightWord: '',
  },
  totalResult: {
    true: 0,
    false: 0,
  },
  answer: null,
  lastLocation: '',
  gameHistory: [],
};

const gameSlice = createSlice({
  name: 'game',

  initialState: gameInitialState,

  reducers: {
    swichToggle(state, { payload }) {
      state.theme = !state.theme;
    },
    startGame(state, { payload }) {
      state.isInGame = !state.isInGame;
    },
    updateTimer(state, { payload }) {
      state.valueTimer--;
    },
    resetTimer(state, { payload }) {
      state.valueTimer = Number(state.timeMode);
    },
    changeGameMode(state, { payload }) {
      state.gameMode = payload;
      if (payload === 'easy') {
        state.dataGame = colorForEasyModeGame;
      } else if (payload === 'medium') {
        state.dataGame = colorForMediumModeGame;
      } else if (payload === 'hard') {
        state.dataGame = colorForHardModeGame;
      }
    },
    changeTimeMode(state, { payload }) {
      state.timeMode = payload;
      state.valueTimer = payload;
    },
    changeIsColorBlind(state, { payload }) {
      state.isColorBlind = payload;
    },
    addLevel(state, { payload }) {
      state.numberOfLevel++;
    },
    changeLeftWord(state, { payload }) {
      state.words.leftWord = payload;
    },
    changeRightWord(state, { payload }) {
      state.words.rightWord = payload;
    },
    changeTotalResult(state, { payload }) {
      if (payload) {
        state.totalResult.true++;
      } else {
        state.totalResult.false++;
      }
    },
    changeAnswer(state, { payload }) {
      state.answer = payload;
    },
    resetTotalResult(state, { payload }) {
      state.totalResult.true = 0;
      state.totalResult.false = 0;
    },
    setLastLocation(state, { payload }) {
      state.lastLocation = payload;
    },
    addGameHistory(state, { payload }) {
      if (state.valueTimer <= 1) {
        console.log('state.totalResult');
        state.gameHistory.push(state.totalResult);
      }
    },
  },
});

export const {
  swichToggle,
  startGame,
  updateTimer,
  changeGameMode,
  changeTimeMode,
  changeIsColorBlind,
  addLevel,
  changeLeftWord,
  changeRightWord,
  changeTotalResult,
  resetTimer,
  changeAnswer,
  resetTotalResult,
  setLastLocation,
  addGameHistory,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
