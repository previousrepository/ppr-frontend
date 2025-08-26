import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-black dark:text-white mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/lecturer/projects/submissions"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          📂 View All Projects
        </Link>
        <Link
          to="/lecturer/projects/access-requests-review"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          📝 Manage Access Requests
        </Link>
        <Link
          to="/lecturer/projects/activity-logs"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          📊 View Activity Logs
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
