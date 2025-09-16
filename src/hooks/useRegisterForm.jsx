import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../libs/firebase/config";
import useFacultyAndDepartment from "./useFacultyAndDepartment";

export const useRegisterForm = (notifySuccess, notifyError) => {
  const navigate = useNavigate();
  const { faculties, departments, getDepartments, error: facultyError } =
    useFacultyAndDepartment();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    faculties: "",
    departments: "",
    password: "",
    confirmPassword: "",
    staffType: "",
  });

  const [errors, setErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [staffRole, setStaffRole] = useState("");
  const [collection, setCollection] = useState("");
  const [step, setStep] = useState(1);
  const [admissionNumber, setAdmissionNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "faculty") {
      getDepartments(value);
      setFormData((prev) => ({ ...prev, faculties: value, departments: "" }));
      setErrors((prev) => ({ ...prev, departments: "" }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      } else {
        const [emailUsername, emailDomain] = formData.email.split("@");
        const isStudentEmail = /^\d{10}$/.test(emailUsername);
        const isLecturerEmail = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(emailUsername);
        const isFubkDomain =
          emailDomain === "fubk.edu.ng" || emailDomain === "ug.fubk.edu.ng";

        if (!isFubkDomain) {
          newErrors.email = "Only FUBK institutional emails are allowed";
        } else if (!isStudentEmail && !isLecturerEmail) {
          newErrors.email =
            "Username must be 10-digit (student) or firstname.lastname (lecturer)";
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.faculties) newErrors.faculties = "Faculty is required";
      if (!formData.departments)
        newErrors.departments = "Department is required";

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (isStaff && !formData.staffType) {
        newErrors.staffType = "Please select staff type";
      }
    }

    if (facultyError) {
      newErrors.form = facultyError;
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validateStep(2);
    if (Object.keys(errs).length > 0) return;

    if (!collection) {
      setErrors((prev) => ({
        ...prev,
        form: "Unable to determine user type. Please use your FUBK email.",
      }));
      return;
    }

    setSubmitLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      if (!user?.uid) throw new Error("Failed to register user.");

      const isStudent = collection === "Student";

      const baseCommon = {
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        displayName: formData.firstName.trim(),
        email: formData.email.trim(),
        faculty: formData.faculties.trim(),
        department: formData.departments.trim(),
        createdAt: serverTimestamp(),
      };

      const userData = isStudent
        ? {
            ...baseCommon,
            uid: user.uid,
            role: "student",
            admissionNumber,
          }
        : {
            ...baseCommon,
            uid: user.uid,
            role: "lecturer",
            staffType: staffRole,
          };

      await setDoc(doc(db, collection, user.uid), userData);

      notifySuccess("Registration successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      if (err?.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            notifyError("This email is already in use.");
            break;
          case "auth/invalid-email":
            notifyError("Invalid email format.");
            break;
          case "auth/weak-password":
            notifyError("Password is too weak.");
            break;
          case "auth/operation-not-allowed":
            notifyError("Sign-up is currently disabled.");
            break;
          default:
            notifyError(`Unexpected error: ${err.message}`);
        }
      } else {
        notifyError(`Unexpected error: ${err?.message || "Unknown error"}`);
      }
      console.error("Registration Error:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    const email = formData.email || "";
    if (email.includes("@")) {
      const [emailUsername, emailDomain] = email.split("@");
      const isStudent = /^\d{10}$/.test(emailUsername);
      const isLecturer = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(emailUsername);
      const isFubk =
        emailDomain === "fubk.edu.ng" || emailDomain === "ug.fubk.edu.ng";

      if (isStudent && isFubk) {
        setCollection("Student");
        setIsStaff(false);
        setAdmissionNumber(emailUsername);
      } else if (isLecturer && isFubk) {
        setCollection("Lecturer");
        setIsStaff(true);
        setAdmissionNumber("");
      } else {
        setCollection("");
        setIsStaff(false);
        setAdmissionNumber("");
      }
    } else {
      setCollection("");
      setIsStaff(false);
      setAdmissionNumber("");
    }
  }, [formData.email]);

  useEffect(() => {
    if (formData.staffType === "academic") {
      setStaffRole("academic");
    } else if (formData.staffType === "non-academic") {
      setStaffRole("non-academic");
    } else {
      setStaffRole("");
    }
  }, [formData.staffType]);


  const facultyOptions = faculties.map((faculty) => ({
    value: faculty.name,
    label: faculty.name,
  }));

  const departmentOptions = departments.map((dept) => ({
    value: dept,
    label: dept,
  }));

  return {
    formData,
    handleChange,
    errors,
    handleSubmit,
    submitLoading,
    isStaff,
    departments,
    facultyOptions,
    departmentOptions,
    step,
    setStep,
    validateStep,
  };
};
