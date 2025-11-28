import { createSlice } from "@reduxjs/toolkit";
import { fetchChatMessages, fetchRecentMessages } from "./messageThunks";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    chatMessages: [],
    recentMessages: [],
  },
  reducers: {
    addMessage: (state, action)=> {
      state.chatMessages = [...state.chatMessages, action.payload]
    },
    resetMessages: (state)=> {
      state.chatMessages = []
    },
    addRecentMessage: (state, action)=> {
      state.recentMessages = [...state.recentMessages, action.payload]
    },
    resetRecentMessages: (state)=> {
      state.recentMessages = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.chatMessages = action.payload;
      })
      .addCase(fetchRecentMessages.fulfilled, (state, action) => {
        state.recentMessages = action.payload;
      })
  }
});

export const {addMessage, resetMessages, addRecentMessage, resetRecentMessages} = messageSlice.actions
export default messageSlice.reducer;
