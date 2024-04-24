import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import authReducer from "../reducers/authReducer";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
