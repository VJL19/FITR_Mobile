import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import registerReducer from "../reducers/registerReducer";
import authReducer from "../reducers/authReducer";
import attendanceReducer from "../reducers/attendanceReducer";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    authReducer: authReducer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
