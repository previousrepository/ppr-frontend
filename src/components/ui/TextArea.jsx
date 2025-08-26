import { motion } from "framer-motion";
import { clsx } from "clsx";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  readOnly = false,
  error,
  disabled = false,
  className = "",
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
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          className={clsx(
            "w-full resize-none rounded-lg border px-4 py-2 text-sm shadow-sm transition duration-200",
            "bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)/50] text-gray-900 border-gray-300 focus:border-blue-700 focus:ring-2 focus:ring-blue-200",
            "dark:text-white dark:border-gray-700 dark:focus:border-blue-500 dark:focus:ring-blue-500",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-400",
            disabled && "bg-gray-100 cursor-not-allowed",
            className
          )}
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

export default TextArea;
