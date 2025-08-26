import { FileQuestion } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  subtitle = "Looks like there's nothing here yet.",
  icon: Icon = FileQuestion,
  children = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 mx-4 md:mx-8 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] border border-dashed border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="mb-4">
        <Icon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
        {title}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
        {subtitle}
      </p>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default EmptyState;
