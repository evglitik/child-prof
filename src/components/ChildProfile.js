import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChildProfile = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const children = JSON.parse(localStorage.getItem("children"));
    setChild(children[id]);
  }, [id]);

  if (!child) return <div>Loading...</div>;

  const skillCategories = ["grossMotor", "fineMotor", "sensory"];

  return (
    <div>
      <header>
        <button onClick={() => navigate(`/dashboard`)}>Back</button>
      </header>
      <h1>
        Profile of {child.name} ({child.age} years old)
      </h1>
      {skillCategories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {child.skills[category] && child.skills[category].length > 0 ? (
            <ul>
              {child.skills[category].map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No unmastered skills in this category.</p>
          )}
        </div>
      ))}
      <button onClick={() => navigate(`/test/${id}`)}>Start Testing</button>
    </div>
  );
};

export default ChildProfile;
