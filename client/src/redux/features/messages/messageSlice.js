import { createSlice } from "@reduxjs/toolkit";
import { createSSEstream, fetchRecentMessages, receiveMessage, sendMessage } from "./messageThunks";

const reducer = (state, action) => {
  state.value = action.payload;
};

const storySlice = createSlice({
  name: "message",
  initialState: {
    value: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSSEstream.fulfilled, reducer)
      .addCase(fetchRecentMessages.fulfilled, reducer)
      .addCase(sendMessage.fulfilled, reducer)
      .addCase(receiveMessage.fulfilled, reducer)
  },
});

export default storySlice.reducer;
