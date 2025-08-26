const FullPageLoading = ({ count = 2 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6 my-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex flex-col rounded-lg bg-gray-200/50 dark:bg-gray-900/50 space-y-2 p-4"
        >
          <div className="flex-1">
            <div className="h-6 bg-gray-200/50 dark:bg-gray-700/50 rounded w-full mb-2"></div>
            <div className="h-32 bg-gray-200/50 dark:bg-gray-700/50 rounded w-full mb-1"></div>
          </div>

          <div className="flex justify-end items-center gap-2">
            <div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-full w-24"></div>
            <div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-full w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FullPageLoading;
