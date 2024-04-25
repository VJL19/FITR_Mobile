import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import authReducer from "../reducers/authReducer";
import registerReducer from "../reducers/registerReducer";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
