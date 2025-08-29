import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/lecturer/layout/SideBar';
import NavBar from '../pages/lecturer/layout/NavBar';
import { motion } from 'framer-motion';
import { useState } from 'react';


const LecturerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
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
    </div>
  );
};

export default LecturerLayout;