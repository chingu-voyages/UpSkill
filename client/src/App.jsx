
import Auth from "./pages/auth/Auth";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      <Footer />
      </Routes>
    </>
  );
}

export default App;
