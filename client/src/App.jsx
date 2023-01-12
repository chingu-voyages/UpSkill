import Auth from "./pages/auth/Auth";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Footer />
      </Routes>
    </>
  );
}

export default App;
