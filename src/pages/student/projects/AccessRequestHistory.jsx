import { useEffect, useState } from "react";
import Header from "../../../components/ui/Header";
import EmptyState from "../components/EmptyState";
import { Clock, CheckCircle, XCircle, Loader, User } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import UseStudentData from "../../../hooks/useStudentData";
import { projectService } from "../../../services/projectService";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import { format } from "date-fns";

const statusMap = {
  pending: {
    icon: <Clock size={16} className="text-yellow-500" />,
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    border: "border-yellow-400",
  },
  approved: {
    icon: <CheckCircle size={16} className="text-green-500" />,
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    border: "border-green-500",
  },
  rejected: {
    icon: <XCircle size={16} className="text-red-500" />,
    badge: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    border: "border-red-500",
  },
};

const formatDate = (timestamp) => {
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

const AccessRequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { currentUser } = useAuth();
  const { userData } = UseStudentData(currentUser?.uid);

  useEffect(() => {
    const fetchAccessRequests = async () => {
      try {
        if (!userData?.studentId || !userData?.department) return;
        const data = await projectService.accessRequestHistory(
          userData.studentId,
          userData.department
        );
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch access requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessRequests();
  }, [userData?.studentId, userData?.department]);

  return (
    <div className="space-y-6 pb-2 md:pb-4">
      <Header title="Access Request History" showBack={true} />

      { loading ? (
        <FullPageLoader />
      ) : requests.length === 0 ? (
        <EmptyState
          title="No Access Requests Yet"
          description="You haven’t made any access requests for restricted projects."
        />
      ) : (
        <div className="space-y-4 px-4 md:px-8">
          {requests.map((request) => (
            <div
              key={request.id}
              className="grid sm:grid-cols-2 gap-4 px-4 md:px-6 my-10"
            >
              {request.history && request.history.length > 0 ? (
                request.history.map((entry, index) => {
                  const { icon, badge, border } =
                    statusMap[entry.status] || statusMap.pending;

                  return (
                    <div
                      key={`${request.id}-${index}`}
                      className={`border-l-4 ${border} rounded-xl p-4 bg-white dark:bg-[var(--color-dark-surface)] shadow mb-3`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {entry.projectTitle}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Status:{" "}
                            <span className="font-medium capitalize">
                              {entry.status}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Requested at:{" "}
                            <span className="font-medium">
                              {formatDate(entry.requestedAt)}
                            </span>
                          </p>
                        </div>

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium capitalize ${badge}`}
                        >
                          {icon}
                          {entry.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  No history available
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessRequestHistory;
