import { Link } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      label: "Submit New Project",
      to: "/student/projects/submit",
      icon: <PlusCircle className="w-5 h-5" />,
      bg: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      label: "Explore Projects",
      to: "/student/explore",
      icon: <Search className="w-5 h-5" />,
      bg: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-sm">
      <h2 className="text-md md:text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <Link
            key={idx}
            to={action.to}
            className={`${action.bg} flex items-center justify-center gap-2 text-white px-4 py-3 rounded-lg transition-colors duration-200`}
            aria-label={action.label}
          >
            {action.icon}
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
