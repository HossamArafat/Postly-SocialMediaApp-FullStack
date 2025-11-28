import { createSlice } from "@reduxjs/toolkit";
import { fetchFeeds } from "./postThunks";

const postSlice = createSlice({
  name: "post",
  initialState: {
    feeds: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload;
      })
  },
});

export default postSlice.reducer;
