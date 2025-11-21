import { createSlice } from "@reduxjs/toolkit";
import { fetchFeeds } from "./postThunks";

const postSlice = createSlice({
  name: "post",
  initialState: {
    feeds: [],    //first look => loading, failed=> retry, []=> no data, [..]=> data show
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload;
      })
  },
});

export default postSlice.reducer;
