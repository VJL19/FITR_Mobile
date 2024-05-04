import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import registerReducer from "../reducers/registerReducer";
import authReducer from "../reducers/authReducer";
import attendanceReducer from "../reducers/attendanceReducer";
import subscriptionReducer from "../reducers/subscriptionReducer";
import postReducer from "../reducers/postReducer";
import routeReducer from "../reducers/routeReducer";
import newsfeedReducer from "../reducers/newsfeedReducer";
import commentReducer from "../reducers/commentReducer";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    authReducer: authReducer,
    attendance: attendanceReducer,
    subscription: subscriptionReducer,
    post: postReducer,
    route: routeReducer,
    newsfeed: newsfeedReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
