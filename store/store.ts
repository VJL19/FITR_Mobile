import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import registerReducer from "../reducers/registerReducer";
import authReducer from "../reducers/authReducer";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    authReducer: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
