import { useState, useEffect } from "react";

// Simulate async fetch
const facultiesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Faculty of Arts",
          departments: [
            "History and International Studies",
            "English",
            "European Languages",
          ],
        },
        {
          id: 2,
          name: "Faculty of Social and Management Sciences",
          departments: [
            "Accounting",
            "Business Administration",
            "Economics",
            "Political Science",
            "Sociology",
            "Geography",
            "Demography and Social Statistics",
          ],
        },
        {
          id: 3,
          name: "Faculty of Science",
          departments: [
            "Biochemistry",
            "Biology",
            "Computer Science",
            "Mathematics",
            "Physics with Electronics",
            "Statistics",
            "Applied Geology",
            "Biochemistry and Molecular Biology",
            "Geology",
            "Industrial Chemistry",
            "Pure Chemistry",
            "Microbiology",
          ],
        },
        {
          id: 4,
          name: "Faculty of Environmental Sciences",
          departments: ["Architecture", "Building", "Quantity Surveying"],
        },
        {
          id: 5,
          name: "Faculty of Education",
          departments: [
            "Science Education",
            "Social Science Education",
            "Educational Foundation",
          ],
        },
        {
          id: 6,
          name: "College of Health Sciences",
          departments: ["MBBS", "Nursing Science", "Anatomy", "Physiology"],
        },
      ]);
    }, 500);
  });
};

const useFacultyAndDepartment = () => {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await facultiesData();
        setFaculties(data);
      } catch (err) {
        setError("Failed to fetch faculties", err.message);
      }
    };
    fetchFaculties();
  }, []);

  const getDepartments = (facultyName) => {
    const faculty = faculties.find((faculty) => faculty.name === facultyName);
    const deptList = faculty ? faculty.departments : [];
    setDepartments(deptList);
    return deptList;
  };

  return { faculties, departments, getDepartments, error };
};

export default useFacultyAndDepartment;
