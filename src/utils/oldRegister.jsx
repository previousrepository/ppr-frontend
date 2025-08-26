// // import { useState, useEffect } from "react";
// import { motion } from "motion/react";
// import { Link } from "react-router-dom";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";
// import Select from "../../components/ui/Select";
// import useToast from "../../contexts/ToastContext";
// // import { authService } from "../../services/authService";
// // import { auth, db } from "../../firebase/config";
// // import { setDoc, doc, serverTimestamp } from "firebase/firestore";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useRegisterForm } from "../../hooks/useRegisterForm";

// const Register = () => {
//   // const navigate = useNavigate();
//   // const [formData, setFormData] = useState({
//   //   fubkId: "",
//   //   fubkPassword: "",
//   //   fullName: "",
//   //   email: "",
//   //   department: "",
//   //   isNumber: "",
//   //   profilePicture: "",
//   //   password: "",
//   //   confirmPassword: "",
//   //   staffType: "",
//   // });
//   const { notifySuccess, notifyError } = useToast();
//   const {
//     formData,
//     handleChange,
//     errors,
//     // step,
//     // handleVerify,
//     handleSubmit,
//     // verifyLoading,
//     submitLoading,
//     isStaff,
//     faculties,
//     departments,
//     selectedFaculty
//   } = useRegisterForm(notifySuccess, notifyError);
//   // const [errors, setErrors] = useState({});
//   // const [isStaff, setIsStaff] = useState(false);
//   // const [step, setStep] = useState(1);
//   // const [verifyLoading, setVerifyLoading] = useState(false);
//   // const [submitLoading, setSubmitLoading] = useState(false);
//   // const [scrapedData, setScrapedData] = useState(null);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [name]: value,
//   //   }));

//   //   // Clear error when user starts typing
//   //   if (errors[name]) {
//   //     setErrors((prevErrors) => ({
//   //       ...prevErrors,
//   //       [name]: "",
//   //     }));
//   //   }
//   // };

//   // const validateForm = () => {
//   //   const newErrors = {};

//   //   // Validate full name
//   //   if (!formData.fullName.trim()) {
//   //     newErrors.fullName = "Full name is required";
//   //   }

//   //   // Validate email
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   if (!formData.email.trim()) {
//   //     newErrors.email = "Email is required";
//   //   } else if (!emailRegex.test(formData.email)) {
//   //     newErrors.email = "Please enter a valid email";
//   //   }

//   //   // Validate FUBK email pattern (only if email is valid)
//   //   const email = formData.email?.trim() || "";

//   //   if (!emailRegex.test(email)) {
//   //     newErrors.email = "Please enter a valid email format";
//   //   } else {
//   //     const [emailUsername, emailDomain] = email.split("@");

//   //     const isStudentEmail = /^\d{10}$/.test(emailUsername);
//   //     const isLecturerEmail = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(emailUsername);
//   //     const isFubkDomain =
//   //       emailDomain === "fubk.edu.ng" || emailDomain === "ug.fubk.edu.ng";

//   //     if (!isFubkDomain) {
//   //       newErrors.email = "Only FUBK institutional emails are allowed";
//   //     } else if (!isStudentEmail && !isLecturerEmail) {
//   //       newErrors.email =
//   //         "Username must be 10-digit (student) or firstname.lastname (lecturer)";
//   //     }
//   //   }

//   //   // Validate department
//   //   if (!formData.department) {
//   //     newErrors.department = "Password is required";
//   //   } else if (formData.department.length < 6) {
//   //     newErrors.department = "Password must be at least 6 characters";
//   //   }

//   //   // Validate password
//   //   if (!formData.password) {
//   //     newErrors.password = "Password is required";
//   //   } else if (formData.password.length < 6) {
//   //     newErrors.password = "Password must be at least 6 characters";
//   //   }

//   //   // Confirm password
//   //   if (!formData.confirmPassword) {
//   //     newErrors.confirmPassword = "Please confirm your password";
//   //   } else if (formData.password !== formData.confirmPassword) {
//   //     newErrors.confirmPassword = "Passwords do not match";
//   //   }

//   //   // Validate staff type if applicable
//   //   if (isStaff && !formData.staffType) {
//   //     newErrors.staffType = "Please select staff type";
//   //   }

//   //   return newErrors;
//   // };

//   // const handleVerifyForm = () => {
//   //   const newErrors = {};

//   //   // Validate email
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   if (!formData.fubkId) {
//   //     newErrors.fubkId = "Email is required";
//   //   } else if (!emailRegex.test(formData.fubkId)) {
//   //     newErrors.fubkId = "Please enter a valid email";
//   //   }

//   //   // Validate password
//   //   if (!formData.fubkPassword) {
//   //     newErrors.fubkFassword = "Password is required";
//   //   } else if (formData.fubkPassword.length < 6) {
//   //     newErrors.fubkFassword = "Password must be at least 6 characters";
//   //   }

//   //   // Validate FUBK email pattern (only if email is valid)
//   //   const email = formData.fubkId?.trim() || "";

//   //   if (!emailRegex.test(email)) {
//   //     newErrors.fubkId = "Please enter a valid email format";
//   //   } else {
//   //     const [emailUsername, emailDomain] = email.split("@");

//   //     const isStudentEmail = /^\d{10}$/.test(emailUsername);
//   //     const isLecturerEmail = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(emailUsername);
//   //     const isFubkDomain =
//   //       emailDomain === "fubk.edu.ng" || emailDomain === "ug.fubk.edu.ng";

//   //     if (!isFubkDomain) {
//   //       newErrors.fubkId = "Only FUBK institutional emails are allowed";
//   //     } else if (!isStudentEmail && !isLecturerEmail) {
//   //       newErrors.fubkId =
//   //         "Username must be 10-digit (student) or firstname.lastname (lecturer)";
//   //     }
//   //   }

//   //   return newErrors;
//   // };

//   const formVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // Step 1: Scrape FUBK
//   // const handleVerify = async (e) => {
//   //   e.preventDefault();

//   //   const formErrors = handleVerifyForm();
//   //   if (Object.keys(formErrors).length > 0) {
//   //     setErrors(formErrors);
//   //     return;
//   //   }
//   //   setVerifyLoading(true);

//   //   try {
//   //     const { data } = await authService.verifyFubkCredentials(
//   //       formData.fubkId,
//   //       formData.fubkPassword
//   //     );

//   //     if (data && data.success) {
//   //       setScrapedData(data.payload);
//   //       // setFormData((prev) => ({
//   //       //   ...prev,
//   //       //   fullName: data.payload.fullName,
//   //       //   email: data.payload.email,
//   //       //   department: data.payload.department,
//   //       //   isNumber: data.payload.isNumber,
//   //       //   role: data.payload.role,
//   //       //   profilePicture: data.payload.profilePicture,
//   //       // }));

//   //       notifySuccess("Verified! Proceed to complete registration.");
//   //     } else {
//   //       notifyError("Verification failed. Please continue manually.");
//   //     }

//   //     setStep(2);
//   //   } catch (err) {
//   //     notifyError(
//   //       err.response?.data?.message ||
//   //         "Verification failed. Try again or continue manually."
//   //     );
//   //     setStep(2);
//   //   } finally {
//   //     setVerifyLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (scrapedData) {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       fullName: scrapedData.fullName || "",
//   //       email: scrapedData.email || "",
//   //       department: scrapedData.department || "",
//   //       isNumber: scrapedData.isNumber || "",
//   //       role: scrapedData.role || "",
//   //       profilePicture: scrapedData.profilePicture || "",
//   //       fubkId: "",
//   //       fubkPassword: "",
//   //     }));
//   //     if (scrapedData.role === "lecturer") {
//   //       setIsStaff(true);
//   //     }
//   //   }
//   // }, [scrapedData]);

//   //step 2: Registration
//   //   const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const formErrors = validateForm();
//   //   if (Object.keys(formErrors).length > 0) {
//   //     setErrors(formErrors);
//   //     console.log(errors);
//   //     return;
//   //   }
//   //   setSubmitLoading(true);

//   //   try {
//   //     const userCredential = await createUserWithEmailAndPassword(
//   //       auth,
//   //       formData.email,
//   //       formData.password
//   //     );
//   //     const user = userCredential.user;

//   //     if (!user.uid) {
//   //       notifyError(
//   //         "User ID is undefined. Cannot create Fire store document."
//   //       );
//   //     }

//   //     const verifyCollection =
//   //       formData.role?.toLowerCase() === "lecturer" ? "Lecturer" : "Student";

//   //     const userData = {
//   //       uid: user.uid,
//   //       fullName: formData.fullName,
//   //       email: formData.email,
//   //       staffType: formData.staffType || null,
//   //       profilePicture: formData.profilePicture || null,
//   //       isNumber: formData.isNumber || null,
//   //       department: formData.department,
//   //       role: formData.role,
//   //       timestamp: serverTimestamp(),
//   //     };

//   //     await setDoc(doc(db, verifyCollection, user.uid), userData);

//   //     // After successful registration, redirect to login page
//   //     notifySuccess("Registration successful! You can now log in.");
//   //     navigate("/login", {
//   //       replace: true,
//   //     });
//   //   } catch (error) {
//   //     switch (error.code) {
//   //       case "auth/email-already-in-use":
//   //         notifyError(
//   //           "This email is already in use. Please use a different email."
//   //         );
//   //         break;
//   //       case "auth/invalid-email":
//   //         notifyError("Invalid email format. Please provide a valid email.");
//   //         break;
//   //       case "auth/weak-password":
//   //         notifyError("Password is too weak. Please use a stronger password.");
//   //         break;
//   //       case "auth/operation-not-allowed":
//   //         notifyError(
//   //           "Email/password sign-up is disabled. Contact the administrator."
//   //         );
//   //         break;
//   //       default:
//   //         notifyError(`An unexpected error occurred:, ${error.message}`);
//   //     }
//   //   } finally {
//   //     setSubmitLoading(false);
//   //   }
//   // };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)]">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={formVariants}
//         className="w-full max-w-md border-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)] rounded-lg shadow-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-6 space-y-10"
//       >
//         <motion.h2
//           variants={itemVariants}
//           className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center"
//         >
//           {/* {step === 1 && "Verify FUBK Account"}
//           {step === 2 && "Create an Account"} */}
//           Create an Account
//         </motion.h2>

//         {errors.form && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
//           >
//             {errors.form}
//           </motion.div>
//         )}

//         {/* {step === 1 && (
//           <form onSubmit={handleVerify} className="space-y-4">
//             <motion.div variants={itemVariants}>
//               <Input
//                 label="FUBK ID"
//                 name="fubkId"
//                 type="email"
//                 value={formData.fubkId.trim()}
//                 onChange={handleChange}
//                 placeholder="Enter your email address"
//                 required
//                 error={errors.email || errors.fubkId}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Input
//                 label="FUBK Portal Password"
//                 name="fubkPassword"
//                 type="password"
//                 value={formData.fubkPassword.trim()}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 required
//                 error={errors.password}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants} className="mt-6">
//               <Button
//                 type="submit"
//                 variant="primary"
//                 fullWidth
//                 isLoading={verifyLoading}
//                 disabled={verifyLoading}
//               >
//                 {verifyLoading ? "Verifying Account" : "Verify Account"}
//               </Button>
//             </motion.div>

//             <motion.p
//               variants={itemVariants}
//               className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
//             >
//               Already have an account?{" "}
//               <Link to="/login" className="text-[#1E40AF] hover:underline">
//                 Login here
//               </Link>
//             </motion.p>
//           </form>
//         )} */}

//         {/* {step === 2 && ( */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <motion.div variants={itemVariants}>
//               <Input
//                 label="Full Name"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 // readOnly={formData?.fullName}
//                 required
//                 placeholder={'Full Name'}
//                 error={errors.fullName}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Input
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 // readOnly={formData?.email}
//                 onChange={handleChange}
//                 required
//                 placeholder={'FUBK Email'}
//                 error={errors.email}
//               />
//             </motion.div>

//             {isStaff && (
//               <motion.div variants={itemVariants}>
//                 <Select
//                   label="Staff Type"
//                   name="staffType"
//                   value={formData.staffType}
//                   onChange={handleChange}
//                   options={[
//                     { value: "academic", label: "Academic" },
//                     { value: "non-academic", label: "Non-Academic" },
//                   ]}
//                   required
//                   error={errors.staffType}
//                 />
//               </motion.div>
//             )}

//             {/* <motion.div variants={itemVariants}>
//               <Input
//                 label="Faculty"
//                 name="faculty"
//                 type="text"
//                 value={formData.faculty}
//                 // readOnly={formData?.faculty}
//                 onChange={handleChange}
//                 required
//                 error={errors.faculty}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Input
//                 label="Department"
//                 name="department"
//                 type="text"
//                 value={formData.department}
//                 // readOnly={formData?.department}
//                 onChange={handleChange}
//                 required
//                 error={errors.department}
//               />
//             </motion.div> */}

//             <motion.div variants={itemVariants}>
//                 <Select
//                   label="faculty"
//                   name="faculty"
//                   value={formData.faculties}
//                   onChange={handleChange}
//                   options={[]}
//                   required
//                   error={errors.faculties}
//                 />
//             </motion.div>

//             {departments.length > 0 &&
//               <motion.div variants={itemVariants}>
//                 <Select
//                   label="Department"
//                   name="departments"
//                   value={formData.departments}
//                   onChange={handleChange}
//                   options={[]}
//                   required
//                   error={errors.departments}
//                 />
//             </motion.div>
//             }

//             <motion.div variants={itemVariants}>
//               <Input
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder={'Password'}
//                 required
//                 error={errors.password}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Input
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder={'Confirm Password'}
//                 required
//                 error={errors.confirmPassword}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <Button
//                 type="submit"
//                 variant="primary"
//                 fullWidth
//                 isLoading={submitLoading}
//                 disabled={submitLoading}
//               >
//                 {submitLoading ? "Creating Account" : "Complete Registration"}
//               </Button>
//             </motion.div>

//             <motion.p
//               variants={itemVariants}
//               className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
//             >
//               Already have an account?{" "}
//               <Link to="/login" className="text-[#1E40AF] hover:underline">
//                 Login here
//               </Link>
//             </motion.p>
//           </form>
//         {/* )} */}
//       </motion.div>
//     </div>
//   );
// };

// export default Register;


//This old Register contain FUBK web scrapping 