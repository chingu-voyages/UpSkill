import Auth from "./pages/auth/Auth";
import Footer from "./components/Footer";
import PostSignup from "./pages/postSignup/PostSignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/post-signup" element={<PostSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
