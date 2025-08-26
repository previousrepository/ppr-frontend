import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';

const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useDarkMode;