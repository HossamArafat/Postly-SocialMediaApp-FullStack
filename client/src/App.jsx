import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Feeds from "./pages/Feeds";
import Messages from "./pages/Messages";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import ChatBox from "./pages/ChatBox";
import Loading from "./components/shared/Loading";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAxiosInterceptor } from "./api/customAxios";
import { fetchUserData } from "./redux/features/users/userThunks";

const App = () => {
  const {user} = useUser()
  const {currentUser} = useSelector(state=> state.user)
  const dispatch = useDispatch()
  useAxiosInterceptor()

  useEffect(() => {
    if (!user || currentUser) return;
    
    // Case 1: user was created more than 1.5 seconds ago => fetch immediately
    const userCreated = new Date(user?.createdAt).getTime()
    if(new Date() - userCreated >= 1500) {
      dispatch(fetchUserData()); return
    }

    // Case 2: user is very new => poll till DB record exists
    const interval = setInterval(() => {
      dispatch(fetchUserData())
    }, 1500);

    return () => clearInterval(interval);
  }, [user, currentUser, dispatch]);

  if( user === undefined ) return <Loading/>

  return (
    <Routes>
      <Route path="/" element={ user === null ? <Login /> : <Layout /> }>
        <Route index element={<Feeds />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:id" element={<ChatBox/>} />
        <Route path="connections" element={<Connections />} />
        <Route path="discover" element={<Discover />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
};
export default App;
