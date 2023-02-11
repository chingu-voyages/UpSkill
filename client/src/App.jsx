import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import PostSignup from "./pages/postSignup/PostSignup";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/profile";
import Messaging from "./pages/Messaging";
import Search from "./pages/Search";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserData } from "./features/user/user-slice";
import { ifAuthenticated } from "./features/login-logout/login-logout-slice";
import { getUserInfo } from "./api";

export const jwtFuncDecode = () => {
  try {
    return jwtDecode(localStorage.getItem("U-connect"));
  } catch (e) {
    return { error: true };
  }
};
const ProtectedRoutes = ({ condition, redirection = "/" }) => {
  if (condition) {
    return <Outlet />;
  }
  return <Navigate to={redirection} replace />;
};

function App() {
  const auth = useSelector(state => state.auth);
  const currentUserId = useSelector(state => state.user.id);
  const dispatch = useDispatch();
  const decoded = jwtFuncDecode();

  useEffect(() => {
    dispatch(ifAuthenticated());
    dispatch(setUser(decoded));

    if (currentUserId) {
      const fetch = async () => {
        const fetchData = await getUserInfo(currentUserId);
        dispatch(setUserData(fetchData.data));
      };
      fetch();
    }
  }, [auth.isAuthenticated, currentUserId]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/q" element={<Search />} />
        <Route
          element={
            <ProtectedRoutes
              condition={jwtFuncDecode().error}
              redirection="/dashboard"
            />
          }
        >
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="/post-signup" element={<PostSignup />} />
        <Route
          element={
            <ProtectedRoutes
              condition={!jwtFuncDecode().error}
              redirection="/auth"
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messaging />} />
        </Route>
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
