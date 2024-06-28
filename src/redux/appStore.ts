import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Infer the 'Rootstate and 'AppDispatch' types from thes tore itself
export type Rootstate = ReturnType<typeof appStore.getState>;
// Interred type: { }
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
