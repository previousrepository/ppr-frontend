import { Link } from "react-router-dom";
import {
  Eye,
  BookOpen,
  FileText,
  School,
  CalendarDays,
} from "lucide-react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Globe, Lock } from "lucide-react";

const accessLevelStyles = {
  public:
    "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-800/30",
  restricted: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-800/30",
};

const ExploreCard = ({ project }) => {
  const {
    id,
    title,
    abstract,
    department,
    projectYear,
    accessLevel,
  } = project;

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const accessLevelIcons = {
  public: <Globe className="w-4 h-4 mr-1" />,
  restricted: <Lock className="w-4 h-4 mr-1" />,
};


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={clsx(
        "h-fit rounded-xl border-l-3 p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]",
        {
          "border-l-green-500 dark:border-l-green-500":
            accessLevel === "public",
          "border-l-red-500 dark:border-l-red-500":
            accessLevel === "restricted",
        }
      )}
    >
      <div className="flex flex-col justify-between items-start mb-3">
        <div className="flex justify-between items-center w-full bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm ">
          <div className="flex items-start text-lg font-semibold text-gray-800 dark:text-white capitalize gap-2">
            <div className="pt-1 text-gray-600 dark:text-white min-h-full w-fit size-6 md:size-8">
              <BookOpen />
            </div>
            <h2 className="break-words">{title}</h2>
          </div>

          <div className="relative group">
            <span
              className={clsx(
                "px-3 py-1 text-xs rounded-full font-medium capitalize shadow-sm whitespace-nowrap inline-flex items-center",
                accessLevelStyles[accessLevel] || accessLevelStyles["public"]
              )}
            >
              {accessLevelIcons[accessLevel]}
              {accessLevel}
            </span>

            <div className="absolute z-10 hidden group-hover:flex w-max bg-gray-800 text-white text-xs rounded-md px-2 py-1 mt-1 left-1/2 -translate-x-1/2 shadow-lg">
              {accessLevel === "public"
                ? "Anyone can view this project"
                : "Restricted — request required for full access"}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start w-full mt-2 bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-3 rounded-xl space-y-3 shadow-sm">
          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <FileText className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white">Abstract:</strong>
            <span>
              {abstract ? abstract.slice(0, 40) + "..." : "N/A"}
            </span>
          </p>

          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <School className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white">Department:</strong>
            <span>
              {department}
            </span>
          </p>

          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <CalendarDays className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white"> Project Year:</strong>
            <span>
              {projectYear}
            </span>
          </p>

        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Link
          to={`/lecturer/explore/view/${id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Eye size={16} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ExploreCard;
