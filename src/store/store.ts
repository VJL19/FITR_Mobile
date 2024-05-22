import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import registerReducer, { registerslice } from "../reducers/registerReducer";
import authReducer from "../reducers/authReducer";
import attendanceReducer, {
  attendanceslice,
} from "../reducers/attendanceReducer";
import subscriptionReducer from "../reducers/subscriptionReducer";
import postReducer, { postslice } from "../reducers/postReducer";
import routeReducer from "../reducers/routeReducer";
import newsfeedReducer, { newsfeedslice } from "../reducers/newsfeedReducer";
import commentReducer from "../reducers/commentReducer";
import notificationReducer from "../reducers/notificationReducer";
import uploadImageReducer from "../reducers/uploadImageReducer";
import { authslice } from "../reducers/authReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    [authslice.reducerPath]: authslice.reducer,
    [postslice.reducerPath]: postslice.reducer,
    [newsfeedslice.reducerPath]: newsfeedslice.reducer,
    [attendanceslice.reducerPath]: attendanceslice.reducer,
    [registerslice.reducerPath]: registerslice.reducer,
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
    getDefaultMiddleware().concat([
      authslice.middleware,
      postslice.middleware,
      newsfeedslice.middleware,
      attendanceslice.middleware,
      registerslice.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
