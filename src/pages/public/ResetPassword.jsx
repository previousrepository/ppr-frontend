import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../libs/firebase/config";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import useToast from "../../contexts/ToastContext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { notifySuccess, notifyError } = useToast();
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    const newErrors = {};
    if (!value) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Live validation feedback
    if (errors?.email) {
      setErrors(validateEmail(value));
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formErrors = validateEmail(email);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmail("");
      notifySuccess(
        "Password reset email sent! Check your inbox (and spam folder)."
      );
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          notifyError("Invalid email format. Please provide a valid email.");
          break;
        case "auth/user-not-found":
          notifyError("No user found with this email. Please check the email.");
          break;
        default:
          notifyError(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)]">
      <motion.form
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md border border-[var(--color-border)] dark:border-[var(--color-dark-border)] rounded-lg shadow-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-6 space-y-6"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-center text-gray-800 dark:text-white"
        >
          Reset Password
        </motion.h2>

        <motion.div variants={itemVariants}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="Enter your email"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || !email || errors.email}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-gray-600 dark:text-gray-400"
        >
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to login
          </Link>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default ResetPassword;
