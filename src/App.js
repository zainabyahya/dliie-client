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
function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      < Navbar />
      <div className='flex-1'>
        <Routes>
          < Route path="/" element={<Home />} />
          < Route path="/assessment" element={<Assessment />} />
          < Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learning/*" element={<Learning />}>
            <Route path=":areaId/:topic" element={<LearningTopicPage />} />
          </Route>
          <Route path="/library" element={<Library />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
      <Footer />
    </div >

  );
}

export default App;
