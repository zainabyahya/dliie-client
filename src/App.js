import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Community from "./pages/Community";
import Learning from "./pages/Learning";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import LearningTopicPage from "./components/LearningTopicPage.jsx"
import CommunityPost from './pages/CommunityPost';
import LibraryPost from './pages/LibraryPost';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AboutPage from "./pages/About.jsx";
import ContactUsPage from "./pages/ContactUs.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicy.jsx";
import LearningPlaceholder from "./ui/LearningPlaceholder.jsx";

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
            <Route index element={<LearningPlaceholder />} />

            <Route path=":areaId/:topic" element={<LearningTopicPage />} />
          </Route>
          <Route path="/library" element={<Library />} />
          <Route path="/library/:itemId" element={<LibraryPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </div>
      <Footer />
    </div >

  );
}

export default App;
