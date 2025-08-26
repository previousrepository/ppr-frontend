import { useEffect, useState } from "react";
import { format } from "date-fns";
import { User2, GraduationCap, FileText, CalendarDays, IdCard, Activity } from "lucide-react";
import { lecturerService } from "../../../services/lecturerService";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import Header from "../../../components/ui/Header";
import UseLecturerData from "../../../hooks/useLecturerData";
import { useAuth } from "../../../hooks/useAuth";
import EmptyState from "../component/EmptyState";

const GetActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { userData } = UseLecturerData(currentUser?.uid);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const rawLogs = await lecturerService.getActivityLogs(userData.department);

        const logsWithTitles = await Promise.all(
          rawLogs.map(async (log) => {
            if (log.projectId) {
              try {
                const project = await lecturerService.getProjectById(userData.department, log.projectId);
                return { ...log, projectTitle: project?.title || log.projectId };
              } catch {
                return { ...log, projectTitle: log.projectId };
              }
            }
            return log;
          })
        );

        setLogs(logsWithTitles);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.department) fetchLogs();
  }, [userData?.department]);

  const formatFirebaseTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const seconds = timestamp.seconds ?? timestamp._seconds;
      const date = new Date(seconds * 1000);
      return isNaN(date.getTime()) ? "Invalid Date" : format(date, "PPpp");
    } catch {
      return "Invalid Date";
    }
  };

  const getRoleIcon = (role) => {
    return role === "Student" ? (
      <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    ) : (
      <User2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    );
  };

  return (
    <div className="space-y-6 pb-2 md:pb-4">
      <Header title="Department Activity Logs" showBack />

      {loading ? (
        <FullPageLoader />
      ) : logs.length === 0 ? (
        <EmptyState
          title="No Activity Logs Available"
          subtitle="There are no logs for your department yet. Actions by students and lecturers will appear here."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 px-4 md:px-6">
          {logs.map((log) => (
            <div
              key={log.id}
              className="border-l-3 border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[var(--color-dark-surface)] shadow-sm space-y-3"
            >

              <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                {getRoleIcon(log.performedByRole)}
                <span className="font-medium">{log.performedByName}</span>
                <span className="text-gray-500 dark:text-gray-400">({log.performedByRole})</span>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <IdCard className="size-4 mt-0.5 text-teal-500 dark:text-teal-400" />
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Project Title:</span>{" "}
                  <span className="font-medium">{log.projectTitle}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Activity className="size-4 mt-0.5 text-indigo-500 dark:text-indigo-400" />
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Action:</span>{" "}
                  <span className="font-medium">{log.action}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CalendarDays className="size-4 mt-0.5 text-amber-500 dark:text-amber-400" />
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Performed At:</span>{" "}
                  <span className="font-medium">{formatFirebaseTimestamp(log.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetActivityLogs;
