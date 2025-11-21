import { createSlice } from "@reduxjs/toolkit";
import { fetchStories } from "./storyThunks";


const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [], //first look => loading, failed=> retry, []=> no data, [..]=> data show
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.stories = action.payload;
      })
  },
});

export default storySlice.reducer;
