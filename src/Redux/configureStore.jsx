import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import localStorage from "./middlewares/localStorage";
import { chatReducer } from "./Reducers/ChatReducer";
import { userReducer } from "./Reducers/UserReducer";

const middlewares = [...getDefaultMiddleware(), localStorage];

const reducer = combineReducers({ chatReducer, userReducer });

export const store = configureStore({ reducer, middleware: middlewares });
