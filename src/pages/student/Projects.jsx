import { Link } from "react-router-dom";
import {
  FileText,
  PencilLine,
  ClipboardList,
  Edit3,
} from "lucide-react";
import Header from "../../components/ui/Header";

const actions = [
  {
    title: "My Projects",
    description: "View or manage your submitted projects.",
    to: "/student/projects/my",
    icon: FileText,
    bg: "bg-blue-600 dark:bg-blue-500",
  },
  {
    title: "Submit New Project",
    description: "Create and submit a new final year project.",
    to: "/student/projects/submit",
    icon: PencilLine,
    bg: "bg-emerald-600 dark:bg-emerald-500",
  },
  {
    title: "Drafts",
    description: "Continue working on your saved or incomplete projects.",
    to: "/student/projects/drafts",
    icon: Edit3,
    bg: "bg-violet-600 dark:bg-violet-500",
  },
  {
    title: "Access Request History",
    description: "Track the status of your access requests.",
    to: "/student/projects/requests",
    icon: ClipboardList,
    bg: "bg-yellow-500 dark:bg-yellow-400",
  },
];

const Projects = () => {
  return (
    <div className="space-y-4">
      <Header title="Projects" />

      <div className="flex flex-col divide-y divide-gray-400 dark:divide-gray-700 divide-solid px-4 md:px-8" >
        {actions.map(({ title, description, to, icon: Icon, bg }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-lg bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${bg} text-white group-hover:scale-105 transition-transform`}>
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
    </div>
  );
};

export default Projects;
