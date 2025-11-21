import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Feeds from "./pages/Feeds";
import Messages from "./pages/Messages";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import { useUser } from "@clerk/clerk-react";
import Loading from "./components/shared/Loading";
import ChatBox from "./pages/ChatBox";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import {fetchUserData} from "./redux/features/users/userThunks"
import { useAxiosInterceptor } from "./api/customAxios";

const App = () => {
  const { user } = useUser();
  const dispatch = useDispatch()
  useAxiosInterceptor(dispatch)
  
  useEffect(()=> {
    if(user) {
      dispatch(fetchUserData())
    }
  }, [dispatch, user])
  
  if( user === undefined ) return <Loading/>

  return (
    <Routes>
      <Route path="/" element={user === null ? <Login /> : <Layout />}>
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
