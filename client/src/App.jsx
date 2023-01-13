import Auth from "./pages/auth/Auth";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
