import { createSlice } from "@reduxjs/toolkit";
import {
  discoverProfiles,
  fetchProfile,
  fetchUserData,
  fetchUsers,
  updateUserData,
} from "./userThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    profile: null,
    posts: [],
    likedPosts: [],
    discoverdUsers: [],
    users: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.posts = action.payload.posts;
        state.likedPosts = action.payload.likedPosts;
      })
       .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(discoverProfiles.fulfilled, (state, action) => {
        state.discoverdUsers = action.payload;
      })
  },
});

export default userSlice.reducer;
