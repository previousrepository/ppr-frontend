import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import useToast from "../../contexts/ToastContext";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { ArrowRight } from "lucide-react";

const Register = () => {
  const { notifySuccess, notifyError } = useToast();
  const {
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
  } = useRegisterForm(notifySuccess, notifyError);

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

  const handleNext = (e) => {
    e.preventDefault();
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md border-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)] rounded-lg shadow-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-6 space-y-6"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center"
        >
          Create an Account
        </motion.h2>

        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex justify-between items-center">
            <div
              className={`flex-1 text-center ${
                step === 1 ? "font-bold text-[#1E40AF]" : "text-gray-500"
              }`}
            >
              Step 1: Personal & Academic
            </div>
            <div
              className={`flex-1 text-center ${
                step === 2 ? "font-bold text-[#1E40AF]" : "text-gray-500"
              }`}
            >
              Step 2: Credentials
            </div>
          </div>
          <div className="relative mt-2 h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-[#1E40AF] rounded-full transition-all duration-300"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </motion.div>

        {errors.form && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          >
            {errors.form}
          </motion.div>
        )}

        <form
          onSubmit={step === 2 ? handleSubmit : handleNext}
          className="space-y-6"
        >
          {step === 1 && (
            <>
              <motion.div variants={itemVariants}>
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  error={errors.firstName}
                  autoFocus
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  error={errors.lastName}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email.trim()}
                  onChange={handleChange}
                  placeholder="FUBK Email"
                  required
                  error={errors.email}
                />
              </motion.div>

              {isStaff && (
                <motion.div variants={itemVariants}>
                  <Select
                    label="Staff Type"
                    name="staffType"
                    value={formData.staffType}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "-- Select Staff Type --" },
                      { value: "academic", label: "Academic" },
                      { value: "non-academic", label: "Non-Academic" },
                    ]}
                    required
                    error={errors.staffType}
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="flex space-x-4">
                <Button
                  type="button"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  variant="primary"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </motion.div>
            </>
          )}

          {step === 2 && (
            <>
              <motion.div variants={itemVariants}>
                <Select
                  label="Faculty"
                  name="faculty"
                  value={formData.faculties}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "-- Select Faculty --" },
                    ...facultyOptions,
                  ]}
                  required
                  error={errors.faculties}
                />
              </motion.div>

              {departments.length > 0 &&
                (!isStaff || formData.staffType === "academic") && (
                  <motion.div variants={itemVariants}>
                    <Select
                      label="Department"
                      name="departments"
                      value={formData.departments}
                      onChange={handleChange}
                      options={[
                        { value: "", label: "-- Select Department --" },
                        ...departmentOptions,
                      ]}
                      required={!isStaff || formData.staffType === "academic"}
                      error={errors.departments}
                    />
                  </motion.div>
                )}

              <motion.div variants={itemVariants}>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password.trim()}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  error={errors.password}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword.trim()}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  error={errors.confirmPassword}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={handleBack}
                  disabled={submitLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={submitLoading}
                  disabled={submitLoading}
                >
                  {submitLoading ? "Creating Account" : "Register"}
                </Button>
              </motion.div>
            </>
          )}

          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-[#1E40AF] hover:underline">
              Login here
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
