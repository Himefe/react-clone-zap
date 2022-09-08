import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "../../Helpers/getLocalStorage";

const getTokenLocal = getLocalStorage("user", null);

const userSlice = createSlice({
  name: "user",
  initialState: {
    usuarioLogado: getTokenLocal ? JSON.parse(getTokenLocal) : null,
  },
  reducers: {
    setUserLogado: {
      reducer(state, action) {
        state.usuarioLogado = action.payload;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: "user",
              value: payload,
            },
          },
        };
      },
    },
  },
});

export const { setUserLogado } = userSlice.actions;

export const userReducer = userSlice.reducer;
