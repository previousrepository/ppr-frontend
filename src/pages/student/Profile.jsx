import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import Header from "../../components/ui/Header";

const actions = [
  {
    title: "Personal Info",
    description: "View or update your personal information.",
    to: "/student/profile/personal-info",
    icon: FileText,
    bg: "bg-orange-600 dark:bg-orange-500",
  },
  {
    title: "Notifications",
    description: "Manage your notification preferences.",
    to: "/student/profile/notifications",
    icon: ClipboardList,
    bg: "bg-indigo-600 dark:bg-indigo-500",
  },
{
  title: "Feedback & Reports",
  description: "Send us feedback or report an issue.",
  to: "/student/profile/feedback",
  icon: MessageSquare,
  bg: "bg-rose-600 dark:bg-rose-500",
}
];

const Profile = () => {
  return (
    <div className="space-y-6">
      <Header title="Profile" />

      <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 px-4 md:px-8">
        {actions.map(({ title, description, to, icon: Icon, bg }) => (
          <li key={title}>
            <Link
              to={to}
              className="group flex items-center justify-between rounded-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-5 shadow-sm hover:shadow-md transition-all duration-200"
              aria-label={title}
            >
              <div className="flex items-center gap-4">
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
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
