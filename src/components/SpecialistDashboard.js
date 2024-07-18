import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpecialistDashboard = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();
  const specialist = JSON.parse(localStorage.getItem("specialist"));

  useEffect(() => {
    const storedChildren = JSON.parse(localStorage.getItem("children"));
    if (storedChildren) {
      setChildren(storedChildren);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div>
      <header>
        <button onClick={handleLogout}>Logout</button>
        <span>{specialist.name}</span>
      </header>
      <h1>Specialist Dashboard</h1>
      <button onClick={() => navigate("/add-child")}>Add Child</button>
      <ul>
        {children.map((child, index) => (
          <li key={index} onClick={() => navigate(`/child/${index}`)}>
            {child.name} - {child.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialistDashboard;
