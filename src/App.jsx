import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import StudyDetail from "./pages/StudyDetail/StudyDetail";
import AddDataForm from "./pages/AddStudy/AddStudy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
// Middlewares
import ProtectedRoute from "./middlewares/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      {" "}
      {/* All app has access to token */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ✅ Use middleware to protect dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/create" element={<AddDataForm />} />
          <Route path="/study/:id" element={<StudyDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
