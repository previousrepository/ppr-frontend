import { useState } from "react";
import {
  BookOpen,
  FileText,
  School,
  CalendarDays,
  CalendarClock,
  BadgeCheck,
  XCircle,
  Clock,
  FileClock,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import clsx from "clsx";

// import { lecturerService } from "../../../services/lecturerService";
// import useToast from "../../../contexts/ToastContext";
// import Button from "../../../components/ui/Button";
import RejectModel from "./RejectModel";
import UseStudentData from "../../../hooks/useStudentData";
// import FullPageLoader from "../../../components/ui/FullPageLoader";
import { Link } from "react-router-dom";

const statusStyles = {
  approved: "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
  pending: "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20",
  rejected: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20",
  draft: "text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-800/50",
};

const statusIcons = {
  draft: <FileClock className="size-4 md:size-5 mr-1" />,
  pending: <Clock className="size-4 md:size-5 mr-1" />,
  approved: <BadgeCheck className="size-4 md:size-5 mr-1" />,
  rejected: <XCircle className="size-4 md:size-5 mr-1" />,
};

const AccessRequestCard = ({ request, lecturer }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    projectId: id,
    requestedAt,
    projectTitle,
    requestReason,
    status = "pending",
    requestedBy,
  } = request;

  const { userData: student } = UseStudentData(requestedBy);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const seconds = timestamp.seconds ?? timestamp._seconds;
      const date = new Date(seconds * 1000);
      return isNaN(date.getTime()) ? "N/A" : format(date, "PPpp");
    } catch {
      return "N/A";
    }
  };

  const formattedDate = formatTimestamp(requestedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "h-fit rounded-xl border-l-3 p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]",
        {
          "border-l-purple-500 dark:border-l-purple-500": status === "draft",
          "border-l-red-500 dark:border-l-red-500": status === "rejected",
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
            <h2 className="break-words">{projectTitle}</h2>
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
            <strong className="font-semibold text-gray-900 dark:text-white">Reason:</strong>
            <span className="whitespace-pre-line">{requestReason}</span>
          </p>

          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <School className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white">Student:</strong>
            <span>{student?.fullName}</span>
          </p>

          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <CalendarDays className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white">Requested At:</strong>
            <span>{formattedDate}</span>
          </p>

          <p className="text-sm md:text-md text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <CalendarClock className="text-gray-500 dark:text-gray-300 size-4 md:size-5" />
            <strong className="font-semibold text-gray-900 dark:text-white">Admission Number:</strong>
            <span>{student?.admissionNumber}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex justify-end gap-4 mt-2">
        {status === "pending" ? (
          <>
            <Button
              variant="success"
              onClick={() => handleDecision("approved")}
              disabled={loading}
            >
              {loading && actionType === "approved" ? "Approving..." : "Approve"}
            </Button>

            <Button
              variant="danger"
              onClick={() => setShowModal(true)}
              disabled={loading}
            >
              Reject
            </Button>
          </>
        ) : (
          <span
            className={clsx(
              "text-xs font-semibold px-3 py-1 rounded-full",
              status === "approved"
                ? "bg-green-100 text-green-600 dark:bg-green-800/20 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-800/20 dark:text-red-400"
            )}
          >
            {status === "approved" ? "Approved" : "Rejected"}
          </span>
        )}
      </div> */}

            <div className="flex justify-end gap-3 mt-4">
        <Link
          to={`/lecturer/projects/access-request/view/${id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Eye size={16} />
          View 
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <RejectModel
          open={showModal}
          onClose={() => setShowModal(false)}
          project={request}
          lecturerData={lecturer}
          type="access-request"
          title="Reject Access Request"
          description="Please provide a reason for rejecting this access request."
          submitText="Reject Request"
        />
      )}
    </motion.div>
  );
};

export default AccessRequestCard;
