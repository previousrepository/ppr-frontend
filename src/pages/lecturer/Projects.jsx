import { Link } from "react-router-dom";
import { FileText, KeySquare, History, AlertTriangle } from "lucide-react";
import Header from "../../components/ui/Header";
import { useAuth } from "../../hooks/useAuth";
import UseLecturerData from "../../hooks/useLecturerData";
import FullPageLoading from "../../components/ui/FullPageLoader";

const actions = [
  {
    title: "Project Submissions",
    description:
      "Review, approve, or reject submitted student projects in your department.",
    to: "/lecturer/projects/submissions",
    icon: FileText,
    bg: "bg-amber-600 dark:bg-amber-500",
  },
  {
    title: "Access Requests",
    description:
      "Manage requests for access to restricted department projects.",
    to: "/lecturer/projects/access-requests-review",
    icon: KeySquare,
    bg: "bg-cyan-600 dark:bg-cyan-500",
  },
  {
    title: "Activity Logs",
    description: "View logs of approvals, rejections, and user actions.",
    to: "/lecturer/projects/activity-logs",
    icon: History,
    bg: "bg-violet-500 dark:bg-violet-400",
  },
];

const LecturerProjects = () => {
  const { currentUser } = useAuth();
  const { userData, loading } = UseLecturerData(currentUser?.uid);

  const isAcademic = userData?.staffType?.toLowerCase() === "academic";

  return (
    <div className="space-y-4">
      <Header title="Projects" />

      <div className="px-4 pb-12 md:pb-0">
        { loading ? 
          <FullPageLoading />
          :
        isAcademic ? (
          <div className="flex flex-col divide-y divide-gray-400 dark:divide-gray-700 divide-solid">
            {actions.map(({ title, description, to, icon: Icon, bg }) => (
              <Link
                key={title}
                to={to}
                className="group rounded-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${bg} text-white group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {description}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition">
                    &gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-400">
                Access Restricted
              </h3>
              <p className="text-sm text-red-600 dark:text-red-300">
                Only academic staff can view and review project submissions and access requests.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerProjects;
