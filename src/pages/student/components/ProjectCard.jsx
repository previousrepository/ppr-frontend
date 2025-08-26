import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  BadgeCheck,
  Clock,
  XCircle,
  FileClock,
  BookOpen,
  FileText,
  School,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import RejectionReasonModal from "../../../components/ui/RejectionReasonModal";
import { motion } from "framer-motion";

const statusStyles = {
  approved:
    "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-800/30",
  pending:
    "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-800/30",
  rejected: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-800/30",
  draft:
    "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-800/50",
};

const statusIcons = {
  draft: <FileClock className="size-4 md:size-5 mr-1" />,
  pending: <Clock className="size-4 md:size-5 mr-1" />,
  approved: <BadgeCheck className="size-4 md:size-5 mr-1" />,
  rejected: <XCircle className="size-4 md:size-5 mr-1" />,
};

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    projectTitle,
    department,
    status = "pending",
    submittedAt,
    abstract,
    updatedAt,
    projectYear,
    submissionRejectionReason,
    requestedAt,
  } = project;

  const isDraft = status === "draft";
  const isRejected = status === "rejected";
  const [showModal, setShowModal] = useState(false);

  const formatFirebaseTimestamp = (timestamp) => {
    if (!timestamp) return null;
    try {
      const seconds = timestamp.seconds ?? timestamp._seconds;
      if (!seconds) return null;
      const date = new Date(seconds * 1000);
      return isNaN(date.getTime()) ? null : format(date, "PPpp");
    } catch {
      return null;
    }
  };

  const formattedUpdated = formatFirebaseTimestamp(updatedAt);
  const formattedSubmitted = formatFirebaseTimestamp(submittedAt);
  const formattedRequestAt = formatFirebaseTimestamp(requestedAt);
  const formattedDate = formattedUpdated || formattedSubmitted || formattedRequestAt || "N/A";

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={clsx(
        "h-fit rounded-xl border-l-3 p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]",
        {
          "border-l-purple-500 dark:border-l-purple-500": isDraft,
          "border-l-red-500 dark:border-l-red-500": isRejected,
          "border-l-yellow-500 dark:border-l-yellow-500": status === "pending",
          "border-l-green-500 dark:border-l-green-500": status === "approved",
        }
      )}
    >
      <div className="flex flex-col justify-between items-start mb-3">
        <div className="flex justify-between items-center w-full bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm">
          <div className="flex items-start text-lg font-semibold text-gray-800 dark:text-white capitalize gap-2">
            <div className="pt-1 text-gray-600 dark:text-white min-h-full w-fit size-6 md:size-8">
              <BookOpen />
            </div>
            <h2 className="break-words">{title || projectTitle}</h2>
          </div>

          <span
            className={clsx(
              "px-3 py-1 text-xs md:text-md rounded-full font-medium capitalize shadow-sm whitespace-nowrap flex items-center",
              statusStyles[status]
            )}
          >
            {statusIcons[status]}
            {status}
          </span>
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

          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <CalendarClock className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white">Submitted At:</strong>
            <span>
              {formattedDate}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        { (isRejected && submissionRejectionReason) && (
          <Button
            variant="ghost"
            size="sm"
            className="self-start text-sm px-1"
            onClick={() => setShowModal(true)}
          >
            View Rejection Reason
          </Button>
        )}

        { (status !== "draft" && !isRejected) && (
          <Link
            to={`/student/projects/view/${id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Eye size={16} />
            View Details
          </Link>
        )}

        {(isDraft || isRejected) && (
          <Link
            to={`/student/projects/edit/${id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition"
          >
            <Pencil size={16} />
            Edit
          </Link>
        )}
      </div>

      {showModal && (
        <RejectionReasonModal
          rejectionReason={submissionRejectionReason}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
};

export default ProjectCard;
