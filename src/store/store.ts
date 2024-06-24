import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import registerReducer, { registerslice } from "../reducers/registerReducer";
import authReducer from "../reducers/authReducer";
import attendanceReducer, {
  attendanceslice,
} from "../reducers/attendanceReducer";
import subscriptionReducer, {
  subscriptionApi,
} from "../reducers/subscriptionReducer";
import postReducer, { postslice } from "../reducers/postReducer";
import routeReducer from "../reducers/routeReducer";
import newsfeedReducer, { newsfeedslice } from "../reducers/newsfeedReducer";
import commentReducer from "../reducers/commentReducer";
import notificationReducer from "../reducers/notificationReducer";
import uploadImageReducer from "../reducers/uploadImageReducer";
import { authslice } from "../reducers/authReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import programReducer, { programApi } from "reducers/programReducer";
import tutorialReducer, { tutorialApi } from "reducers/tutorialReducer";
export const store = configureStore({
  reducer: {
    [authslice.reducerPath]: authslice.reducer,
    [postslice.reducerPath]: postslice.reducer,
    [newsfeedslice.reducerPath]: newsfeedslice.reducer,
    [attendanceslice.reducerPath]: attendanceslice.reducer,
    [registerslice.reducerPath]: registerslice.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [tutorialApi.reducerPath]: tutorialApi.reducer,
    tutorial: tutorialReducer,
    program: programReducer,
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
      programApi.middleware,
      subscriptionApi.middleware,
      tutorialApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
