import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import StudyDetail from "./pages/StudyDetail/StudyDetail";
import AddDataForm from "./pages/AddStudy/AddStudy";
function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<AddDataForm />} />
        <Route path="/study/:id" element={<StudyDetail />} />
      </Routes>
    </>
  );
}

export default App;
