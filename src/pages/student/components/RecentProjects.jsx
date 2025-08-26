import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { db } from "../../../libs/firebase/config";
import { useAuth } from "../../../hooks/useAuth";
import UseStudentData from "../../../hooks/useStudentData";
import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Clock,
  CheckCircle,
  Hourglass,
  XCircle,
  Eye,
} from "lucide-react";

const statusConfig = {
  approved: {
    icon: <CheckCircle size={14} className="text-green-600" />,
    style: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400",
  },
  pending: {
    icon: <Hourglass size={14} className="text-yellow-600" />,
    style: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  rejected: {
    icon: <XCircle size={14} className="text-red-600" />,
    style: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400",
  },
  "under review": {
    icon: <Eye size={14} className="text-blue-600" />,
    style: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status?.toLowerCase()] || {
    icon: null,
    style: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400",
  };
  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.style}`}
    >
      {config.icon}
      {status}
    </span>
  );
};

const RecentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { userData } = UseStudentData(currentUser?.uid);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userData?.department) return;
      setLoading(true);

      try {
        const q = query(
          collection(db, `Projects/${userData.department}/projectSubmissions`),
          where("submittedBy", "==", userData?.studentId),
          orderBy("submittedAt", "desc"),
          limit(5)
        );

        const snapshot = await getDocs(q);
        const fetchedProjects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching recent projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userData?.department , userData?.studentId, currentUser]);

  return (
    <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-sm h-fit">
      <h2 className="text-md md:text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" /> Recent Projects
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-sm font-medium text-black dark:text-white truncate flex items-center gap-1">
                    <FileText size={16} className="text-purple-500" />
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 flex items-center gap-1">
                    <FileText size={16} className="text-emerald-500" />
                    {project.abstract
                      ? project.abstract.slice(0, 30) + "..."
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={16} className="text-yellow-500" />
                    {project.submittedAt?.toDate
                      ? formatDistanceToNow(project.submittedAt.toDate(), {
                          addSuffix: true,
                        })
                      : ""}
                  </p>
                </div>
                <StatusBadge status={project.status} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No recent projects found.
        </p>
      )}
    </div>
  );
};

export default RecentProjects;
