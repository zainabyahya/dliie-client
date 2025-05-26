import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import Learning from "./pages/Learning";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import LearningTopicPage from "./components/LearningTopicPage.jsx"
import CommunityPost from './pages/CommunityPost';
import LibraryDetails from './pages/LibraryDetails';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      < Navbar />
      <div className='flex-1 flex flex-col'>
        <Routes>
          < Route path="/" element={<Home />} />
          < Route path="/assessment" element={<Assessment />} />
          < Route path="/community" element={<Community />} />
          <Route path="/community/:postId" element={<CommunityPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learning/*" element={<Learning />}>
            <Route path=":areaId/:topic" element={<LearningTopicPage />} />
          </Route>
          <Route path="/library" element={<Library />} />
          <Route path="/library/:itemId" element={<LibraryDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div >

  );
}

export default App;
