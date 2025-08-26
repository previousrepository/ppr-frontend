const StatusFilter = ({ value, onChange, statuses }) => {
  return (
    <div className="flex flex-col flex-wrap justify-center items-start space-y-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all
            ${
              value === status
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
