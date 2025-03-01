import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import StudyDetail from "../pages/StudyDetail/StudyDetail";
import AddDataForm from "../pages/AddStudy/AddStudy";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Articles from "../pages/Articles/Articles";
import { SidebarProvider } from "../context/SidebarContext";

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* ✅ Redirect `/` to `/dashboard` if logged in */}
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Home />}
      />

      {/* ✅ Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <SidebarProvider>
              <DashboardLayout />
            </SidebarProvider>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study/:id" element={<StudyDetail />} />
          <Route path="/create" element={<AddDataForm />} />
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Route>

      {/* ✅ Other Routes */}
      <Route path="/signup" element={<Register />} />
      <Route path="/create" element={<AddDataForm />} />
      <Route path="/study/:id" element={<StudyDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
