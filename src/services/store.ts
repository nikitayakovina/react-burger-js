import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer.js';

import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
