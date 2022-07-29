import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { chatReducer } from "./Reducers/ChatReducer";

const middlewares = [...getDefaultMiddleware()];

const reducer = combineReducers({ chatReducer });

export const store = configureStore({ reducer, middleware: middlewares });
