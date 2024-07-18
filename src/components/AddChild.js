import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddChild = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const navigate = useNavigate();

  const handleAddChild = (child) => {
    const storedChildren = JSON.parse(localStorage.getItem("children")) || [];
    const updatedChildren = [...storedChildren, child];
    localStorage.setItem("children", JSON.stringify(updatedChildren));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthDate = new Date(birthdate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const child = { name, age, birthdate, skills: [] };
    handleAddChild(child);
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Add Child</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddChild;
