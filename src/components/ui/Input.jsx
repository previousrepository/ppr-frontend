import { motion } from 'framer-motion';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  readOnly = false,
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium mb-1 dark:text-gray-200 text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-opacity-50 
            bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] dark:border-gray-800 dark:text-white 
            focus:outline-none transition-colors duration-200
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-700'} 
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} 
            ${className}`}
        />
      </motion.div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;