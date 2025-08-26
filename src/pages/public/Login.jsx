import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye } from "lucide-react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../libs/firebase/config";
import useToast from "../../contexts/ToastContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../libs/firebase/config";

const Login = () => {
  const { notifySuccess, notifyError } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = formData.email?.trim() || "";
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    } else {
      const [emailUsername, emailDomain] = email.split("@");
      const isFubkEmail =
        emailDomain === "fubk.edu.ng" || emailDomain === "ug.fubk.edu.ng";
      const isValidUser =
        /^\d{10}$/.test(emailUsername) ||
        /^[a-zA-Z]+\.[a-zA-Z]+$/.test(emailUsername);

      if (!isFubkEmail || !isValidUser) {
        newErrors.email = "Only valid FUBK student or staff emails allowed";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { email, password } = formData;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const studentDoc = await getDoc(doc(db, "Student", user.uid));
      const lecturerDoc = await getDoc(doc(db, "Lecturer", user.uid));
      let userRole = null;

      if (studentDoc.exists()) {
        userRole = "student";
      } else if (lecturerDoc.exists()) {
        userRole = "lecturer";
      } else {
        userRole = "guest";
      }

      if (!userRole) {
        notifyError("User role not found. Please contact support.");
        return;
      }

      notifySuccess("Login successful.");
      if (userRole === "student") {
        navigate("/student/dashboard");
      } else if (userRole === "lecturer") {
        navigate("/lecturer/dashboard");
      } else {
        navigate("/guest/explore");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          return notifyError("Account not found. Please register.");
        case "auth/invalid-credential":
          return notifyError("Account not found. Please register.");
        case "auth/wrong-password":
          return notifyError("Incorrect password");
        case "auth/too-many-requests":
          return notifyError("Too many attempts. Try again later.");
        default:
          return notifyError(`Login failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const anonymousLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      notifySuccess("Guest login successful.");
      navigate("/guest/explore");
      return result.user;
    } catch (error) {
      notifyError("Guest login failed:", error);
      throw error;
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md border-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)] rounded-lg shadow-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-6 space-y-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white"
        >
          Login to Your Account
        </motion.h2>

        {errors.form && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          >
            {errors.form}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div variants={itemVariants}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              placeholder="Enter your FUBK email"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              placeholder="Enter your password"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-4 text-right text-sm text-gray-600 dark:text-gray-400"
          >
            <Link
              to="/resetPassword"
              className="text-[#1E40AF] hover:underline"
            >
              Forgot password?
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#1E40AF] hover:underline">
              Register here
            </Link>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4 opacity-70 dark:opacity-50"
          >
            <hr className="flex-1 border-current" />
            <span>OR</span>
            <hr className="flex-1 border-current" />
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-6">
          <Button
            type="submit"
            variant="outline"
            fullWidth
            icon={<Eye className="w-5 h-5" />}
            size="lg"
            onClick={anonymousLogin}
          >
            Continue as Guest
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
