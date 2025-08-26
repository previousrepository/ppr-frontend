import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Clock, User2, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { db } from "../../../libs/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const toDate = (ts) => {
  if (!ts) return null;
  if (typeof ts?.toDate === "function") return ts.toDate();
  if (typeof ts === "number") return new Date(ts);
  if (typeof ts === "string") return new Date(ts);
  return null;
};

const AccessRequestList = ({ requests = [] }) => {
  const [requestsWithStudents, setRequestsWithStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requests.length) {
      setRequestsWithStudents([]);
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      setLoading(true);
      
      try {
        const pendingRequests = requests.filter(req => req.status === "pending");
        const results = await Promise.all(
          pendingRequests.map(async (req) => {
            if (!req.requestedBy) return { ...req, studentName: "Unknown" };

            const studentRef = doc(db, "Student", req.requestedBy);
            const studentSnap = await getDoc(studentRef);

            return {
              ...req,
              studentName: studentSnap.exists()
                ? studentSnap.data().fullName
                : "Unknown",
            };
          })
        );

        setRequestsWithStudents(results);
      } catch (err) {
        console.error("Error fetching student data for access requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [requests]);

  return (
    <div className="bg-white/50 dark:bg-gray-900/50 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-fit">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Lock size={18} className="text-purple-500" />
          Pending Access Requests
        </h2>
        <Link
          to="/lecturer/projects/access-requests-review"
          className="text-xs md:text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          View All
        </Link>
      </div>

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
      ) :  requestsWithStudents.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent access request found.</p>
      ) : (
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {requestsWithStudents.map((req) => {
            const date = toDate(req.requestedAt);
            const timeAgo = date
              ? formatDistanceToNow(date, { addSuffix: true })
              : "N/A";

            return (
              <li key={req.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-black dark:text-white truncate flex items-center gap-1">
                      <User2 size={16} className="text-emerald-500" />
                      <span className="truncate">{req.studentName}</span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 flex items-center gap-1">
                      <FileText size={16} className="text-purple-500" />
                      {req.projectTitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <Clock size={16} className="text-yellow-500" />
                      {timeAgo}
                    </p>
                  </div>

                  <Link
                    to={`/lecturer/projects/access-request/view/${req.projectId}`}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 dark:hover:bg-green-800 dark:bg-green-700 dark:text-white dark:border-green-800 transition"
                  >
                    Review
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AccessRequestList;
