import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import chatReducer from "./reducers/chatSlice";
import groupReducer from "./reducers/groupSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    group: groupReducer,
  },
});

// Infer the 'Rootstate and 'AppDispatch' types from thes tore itself
export type Rootstate = ReturnType<typeof appStore.getState>;
// Interred type: { }
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
