import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contacts.reducer';

import { authReducer } from './auth/auth.reducer';
import {
  persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { gameReducer } from './game/game.reducer';

// const contactsConfig = {
//   key: 'contacts',
//   storage,
//   whitelist: ['contacts'],
//   //blacklist:['filter']
// };
const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
  //blacklist:['filter']
};
// const resultsConfig = {
//   key: 'gameHistory',
//   storage,
//   whitelist: ['gameHistory'],
//   //blacklist:['filter']
// };

const gameConfig = {
  key: 'game',
  storage,
  whitelist: ['gameHistory'],
  //blacklist:['filter']
};

export const store = configureStore({
  reducer: {
    // contactsStore: persistReducer(contactsConfig, contactsReducer),
    contactsStore: contactsReducer,
    auth: persistReducer(authConfig, authReducer),
    game: persistReducer(gameConfig, gameReducer),
    // results: persistReducer(resultsConfig, resultsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
