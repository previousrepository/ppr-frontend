
const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-2 w-40 md:w-64 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)/20] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all "
    />
  );
};

export default SearchInput;