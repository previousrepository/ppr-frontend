import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

      {/* Right side - Background */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block relative flex-1 bg-primary-600"
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <BookOpen className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-2">FUBK PPR</h2>
            <p className="text-xl">Student Research Repository System</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}