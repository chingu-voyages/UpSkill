import Auth from "./pages/auth/Auth";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Footer /> */}
      </Routes>
    </>
  );
}

export default App;
