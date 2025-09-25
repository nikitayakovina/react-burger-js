import { configureStore } from '@reduxjs/toolkit';

import { wsActions, wsProfileActions } from '../services/actions/ws.ts';
import { socketMiddleware } from '../services/socketMiddleware.ts';
import { rootReducer } from './rootReducer.js';

import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware('wss://norma.nomoreparties.space', wsActions),
      socketMiddleware('wss://norma.nomoreparties.space', wsProfileActions)
    ),
});

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
