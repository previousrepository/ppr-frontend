import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { 
  Home,
  BookOpen,
  FileText,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import clsx from 'clsx';

export function Sidebar() {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: Home },
    { name: 'My Projects', to: '/projects', icon: FileText },
    { name: 'Explore', to: '/explore', icon: BookOpen },
    { name: 'Profile', to: '/profile', icon: Users },
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">FUBK PPR</h1>
        <ThemeToggle />
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center">
          <img
            src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
            alt="Avatar"
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {user?.displayName || 'Guest User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}