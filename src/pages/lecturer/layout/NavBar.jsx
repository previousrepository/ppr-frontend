import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Search,
  User,
} from "lucide-react";
import clsx from "clsx";

const NavBar = () => {
  const navigation = [
    { name: "Home", to: "/lecturer/dashboard", icon: Home },
    { name: "Project", to: "/lecturer/projects", icon: FileText },
    { name: "Explore", to: "/lecturer/explore", icon: Search },
    { name: "Profile", to: "/lecturer/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
      <div className="flex justify-around items-center h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center justify-center px-3 py-1 rounded-md transition-all",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5 mb-0.5" />
                  {isActive && (
                    <span className="text-xs font-medium">{item.name}</span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default NavBar;