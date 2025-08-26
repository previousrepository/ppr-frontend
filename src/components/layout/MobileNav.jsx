import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle.jsx';
import clsx from 'clsx';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'My Projects', to: '/projects' },
    { name: 'Explore', to: '/explore' },
    { name: 'Profile', to: '/profile' },
    { name: 'Settings', to: '/settings' },
  ];

  return (
    <div className="lg:hidden">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">FUBK PPR</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
          >
            <nav className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'block px-3 py-2 rounded-md text-base font-medium',
                      isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}