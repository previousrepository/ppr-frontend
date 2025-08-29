import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
// import { useAuth } from "../../../hooks/useAuth.jsx";
import {
  Home,
  BookOpen,
  FileText,
  Users,
  // Settings,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import Button from "../../../components/ui/Button.jsx";
import { auth } from "../../../libs/firebase/config.js";
// import { ThemeToggle } from "../../../components/ui/ThemeToggle.jsx";
import Modal from "../../../components/ui/Modal.jsx";

const SideBar = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigation = [
    { name: "Dashboard", to: "/student/dashboard", icon: Home },
    { name: "My Projects", to: "/student/projects", icon: FileText },
    { name: "Explore", to: "/student/explore", icon: BookOpen },
    { name: "Profile", to: "/student/profile", icon: Users },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="hidden lg:flex fixed top-0 left-0 h-screen w-64 flex-col border-r-2 border-gray-200 dark:border-gray-700 z-50 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]"
    >
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          🎓 PPR Student
        </h1>
        {/* <ThemeToggle /> */}
      </div>

      <nav className="flex-1 py-6 space-y-2">
        {navigation.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-3 rounded-sm text-lg font-medium transition-colors duration-150",
                isActive
                  ? "bg-blue-900/20 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/40"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )
            }
          >
            <Icon className="w-6 h-6" />
            {name}
          </NavLink>
        ))}
      </nav>

      <Button
        onClick={() => setShowLogoutModal(true)}
        variant="danger"
        fullWidth
        icon={<LogOut size={20} />}
        className="justify-start gap-1"
        size="lg"
      >
        Logout
      </Button>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        showFooter={true}
        footerContent={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to log out of your account?
        </p>
      </Modal>

      {/* <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
        <img
          src={
            user?.photoURL ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"
          }
          alt="Avatar"
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="text-sm">
          <p className="font-medium text-gray-800 dark:text-white">
            {user?.displayName || "Guest User"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div> */}
    </motion.div>
  );
}

export default SideBar;