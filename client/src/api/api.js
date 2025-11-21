import { customAxios } from "./customAxios";

const api = {
    // USER APIS
    fetchUserData: ()=> customAxios.get("/user/data"),
    updateUserData: (data)=> customAxios.put("/user/update", data),
    fetchProfile: (id)=> customAxios.get(`/user/${id}`),
    fetchUsers: ()=> customAxios.get("/user/all"),
    discoverProfiles: (data)=> customAxios.get(`/user/discover/${data}`),
    followProfile: (data)=> customAxios.put("/user/follow", data),
    unfollowProfile: (data)=> customAxios.put("/user/unfollow", data),
    removeProfile: (data)=> customAxios.put("/user/remove", data),

    // CONNECTION APIS
    requestConnection: (data)=> customAxios.put("/connection/connect", data),
    acceptConnection: (data)=> customAxios.put("/connection/accept", data),

    // POST APIS
    fetchFeeds: ()=> customAxios.get("/post/feeds"),
    fetchLikedPosts: ()=> customAxios.get(`/post/liked-posts`),
    addPost: (data)=> customAxios.post("/post/add", data),
    likePost: (data)=> customAxios.put("/post/like", data),

    // STORY APIS
    fetchStories: ()=> customAxios.get("/story/data"),
    addStory:  (data)=> customAxios.post("/story/add", data),

    // MESSAGE APIS
    createSSEstream: ()=> customAxios.post("/message/sse-stream"),
    sendMessage: (data)=> customAxios.get("/message/send", data),
    receiveMessage: (data)=> customAxios.get("/message/receive", data),
    fetchRecentMessage: ()=> customAxios.post("/message/recent-message"),
}

export default api