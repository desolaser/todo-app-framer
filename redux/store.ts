import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { 
  persistStore, 
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import todoReducer from './slices/todoSlice';

const persistConfig = {
  key: 'auth',
  storage
}

const rootReducer = persistCombineReducers(persistConfig, {
  todo: todoReducer,
});

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export {
  persistor
};