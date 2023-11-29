import { configureStore } from "@reduxjs/toolkit";
import { userReducer as userReducer } from "./reducers/userReducer";
import { wodsReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    userReducer,
    wodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
