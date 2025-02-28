import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { token } = useContext(AuthContext);
  console.log("Token from root app:", token);
  return (
    <>
      {" "}
      {/* All app has access to token */}
      <AuthProvider>
        <Routes>
          {" "}
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Home />}
          />
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

// function App() {
//   const { token } = useContext(AuthContext);
//   console.log("Token reached in app:", token);
//   return (
//     <>
//       {" "}
//       {/* All app has access to token */}
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* ✅ Use middleware to protect dashboard */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Route>
//           <Route path="/signup" element={<Register />} />
//           <Route path="/create" element={<AddDataForm />} />
//           <Route path="/study/:id" element={<StudyDetail />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </AuthProvider>
//     </>
//   );
// }

export default App;
