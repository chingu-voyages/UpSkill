import Auth from "./pages/auth/Auth";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import PostSignup from "./pages/postSignup/PostSignup";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/post-signup" element={<PostSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
