import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import PostSignup from "./pages/postSignup/PostSignup";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/profile";
import Messaging from "./pages/Messaging";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/q" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/post-signup" element={<PostSignup />} />
        <Route path="/messages" element={<Messaging />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
