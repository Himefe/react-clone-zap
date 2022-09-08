import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    activeChatId: null,
    messagesList: [],
    contacts: [],
  },
  reducers: {
    addChatList(state, action) {
      state.chatList = action.payload;
    },
    addActiveChat(state, action) {
      state.activeChatId = action.payload;
    },
    addMessagesLists(state, action) {
      state.messagesList = action.payload;
    },
    addContactList(state, action) {
      state.contacts = action.payload;
    },

    resetMessagesList(state) {
      state.messagesList = [];
    },
  },
});

export const {
  addActiveChat,
  addChatList,
  addMessagesLists,
  resetMessagesList,
  addContactList,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
