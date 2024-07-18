import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SpecialistDashboard from "./components/SpecialistDashboard";
import AddChild from "./components/AddChild";
import ChildProfile from "./components/ChildProfile";
import SkillTesting from "./components/SkillTesting";

const App = () => {
  return (
    <Router basename="/child-prof">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<SpecialistDashboard />} />
        <Route path="/add-child" element={<AddChild />} />
        <Route path="/child/:id" element={<ChildProfile />} />
        <Route path="/test/:id" element={<SkillTesting />} />
      </Routes>
    </Router>
  );
};

export default App;
