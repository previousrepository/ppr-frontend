import useDarkMode from '../../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import Button from "./Button";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useDarkMode();

  return (
    <Button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
      title="Toggle Dark Mode"
    >
      {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
    </Button>
  );
};