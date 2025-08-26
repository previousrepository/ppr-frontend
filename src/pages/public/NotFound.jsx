// src/pages/errors/NotFound.jsx
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HomeIcon } from "lucide-react";

const NotFound = () => {
  const { currentUser, role } = useAuth();
  const navigate = useNavigate();

  const getMessage = () => {
    if (!currentUser) {
      return "You seem lost. This page doesn’t exist.";
    }

    switch (role) {
      case "student":
        return "Oops! Student, the page you're looking for wasn't found.";
      case "lecturer":
        return "Lecturer, looks like this page doesn't exist.";
      case "staff":
        return "Staff member, we couldn’t find that page.";
      default:
        return "Oops! This page doesn’t exist.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)] text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center px-4 py-12 bg-[var(--shared-background)] dark:bg-[var(--shared-dark-background)] text-center space-y-6"
      >
        {/* <img
          src="/src/assets/images/404.svg"
          alt="404 Not Found"
          className="max-w-xs md:max-w-md dark:brightness-90"
        /> */}

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] dark:text-[var(--color-dark-primary)] space-y-5">
          <p className="text-6xl md:text-8xl">404</p>
          <p> Page Not Found</p>
        </h1>

        <p className="text-base md:text-lg text-[var(--color-text)] dark:text-[var(--color-dark-text)] max-w-xl">
          {getMessage()}
        </p>

        <div className="flex gap-8 mt-4 ">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            icon={<HomeIcon className="w-5 h-5" />}
          >
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
