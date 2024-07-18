import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import skills from "../skills";

const SkillTesting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkedSkills, setCheckedSkills] = useState({});
  const [child, setChild] = useState(null);
  const [childSkills, setChildSkills] = useState(null);

  useEffect(() => {
    const children = JSON.parse(localStorage.getItem("children"));
    const child = children[id];
    setChild(child);
    setChildSkills(skills[child.age]);

    const initialCheckedSkills = {};
    Object.keys(skills[child.age]).forEach((category) => {
      initialCheckedSkills[category] = {};
      skills[child.age][category].forEach((skill) => {
        initialCheckedSkills[category][skill] = false;
      });
    });
    setCheckedSkills(initialCheckedSkills);
  }, [id]);

  const handleCheck = (category, skill) => {
    setCheckedSkills((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [skill]: !prev[category][skill],
      },
    }));
  };

  const handleSave = () => {
    const nonMasteredSkills = {};
    for (const category in checkedSkills) {
      nonMasteredSkills[category] = [];
      for (const skill in checkedSkills[category]) {
        if (!checkedSkills[category][skill]) {
          nonMasteredSkills[category].push(skill);
        }
      }
    }
    const children = JSON.parse(localStorage.getItem("children"));
    children[id].skills = nonMasteredSkills;
    localStorage.setItem("children", JSON.stringify(children));
    navigate(`/child/${id}`);
  };

  if (!child || !childSkills) return <div>Loading...</div>;

  return (
    <div>
      <h1>Testing Skills of {child.name}</h1>
      <p>Age: {child.age}</p>
      <button onClick={() => navigate("/dashboard")}>Back</button>
      {Object.keys(childSkills).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {childSkills[category].map((skill) => (
              <li key={skill}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedSkills[category]?.[skill] || false}
                    onChange={() => handleCheck(category, skill)}
                  />
                  {skill}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SkillTesting;
