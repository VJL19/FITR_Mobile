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
import notificationReducer from "../reducers/notificationReducer";
import uploadImageReducer from "../reducers/uploadImageReducer";
import { authslice } from "../reducers/authReducer";
export const store = configureStore({
  reducer: {
    [authslice.reducerPath]: authslice.reducer,
    counter: counterReducer,
    register: registerReducer,
    authReducer: authReducer,
    attendance: attendanceReducer,
    subscription: subscriptionReducer,
    post: postReducer,
    route: routeReducer,
    newsfeed: newsfeedReducer,
    comment: commentReducer,
    notification: notificationReducer,
    uploadImage: uploadImageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authslice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
