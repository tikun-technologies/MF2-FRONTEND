import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import StudyDetail from "../pages/StudyDetail/StudyDetail";
import AddDataForm from "../pages/AddStudy/AddStudy";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import PasswordReset from "../pages/Auth/PasswordReset";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Articles from "../pages/Articles/Articles";
import { SidebarProvider } from "../context/SidebarContext";
import ArticleDetails from "../features/articles/pages/ArticleDetails";
import StudyDetailPlayground from "../pages/Playground/Playground"
const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* ✅ Redirect `/` to `/dashboard` if logged in */}
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" replace /> : <Home />}
      />

      {/* ✅ Public Routes */}
      <Route path="/articles/:id" element={<ArticleDetails />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/create" element={<AddDataForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<PasswordReset />} />

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
          <Route path="/playground/:id" element={<StudyDetailPlayground />} />
          <Route path="/create" element={<AddDataForm />} />
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Route>

      {/* ✅ Catch-All Route (404 Page - Optional) */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
