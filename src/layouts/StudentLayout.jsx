import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../pages/student/layouts/Navbar";
import { Sidebar } from "../pages/student/layouts/SideBar";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-ppr-animated min-h-screen transition-colors duration-200">
      <NavBar toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 lg:pl-64"
        >
          <div className="max-w-7xl mx-auto"> 
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentLayout;
