import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    activeChatId: null,
  },
  reducers: {
    addChatList(state, action) {
      state.chatList.push(...action.payload);
    },
    addActiveChat(state, action) {
      state.activeChatId = action.payload;
    },
  },
});

export const { addActiveChat, addChatList } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
