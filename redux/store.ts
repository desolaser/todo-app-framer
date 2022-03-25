import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todoReducer from './slices/todoSlice';
// ...
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;