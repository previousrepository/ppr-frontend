import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../libs/firebase/config";
import { useAuth } from "../../hooks/useAuth";
import UseStudentData from "../../hooks/useStudentData";
import Header from "../../components/ui/Header";
import StatCard from "./components/StatCard";
import RecentProjects from "./components/RecentProjects";
import AccessRequestList from "./components/AccessRequestList";
import QuickActions from "./components/QuickActions";
import FullPageLoader from "../../components/ui/FullPageLoader";
import {
  Folder,
  CheckCircle,
  Clock,
  Lock,
  XCircle,
  FileClock,
} from "lucide-react";

const StudentDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { userData } = UseStudentData(currentUser?.uid);

  console.log
  useEffect(() => {
    const fetchStats = async () => {

      if (!userData?.department || !userData?.studentId) return;
      try {
        const [projectsSnap, accessSnap] = await Promise.all([
          getDocs(
            query(
              collection(
                db,
                `Projects/${userData?.department}/projectSubmissions`
              ),
              where("submittedBy", "==", userData?.studentId)
            )
          ),
          getDocs(
            query(
              collection(db, `Projects/${userData?.department}/accessRequests`),
              where("requestedBy", "==", userData?.studentId)
            )
          ),
        ]);

        const projects = projectsSnap.docs.map((doc) => doc.data());
        const accessRequests = accessSnap.docs.map((doc) => doc.data());

        // Project stats
        const approvedProjects = projects.filter(
          (p) => p.status === "approved"
        ).length;
        const pendingProjects = projects.filter(
          (p) => p.status === "pending"
        ).length;
        const rejectedProjects = projects.filter(
          (p) => p.status === "rejected"
        ).length;
        const draftProjects = projects.filter(
          (p) => p.status === "draft"
        ).length;

        // Access request stats
        const approvedAccess = accessRequests.filter(
          (r) => r.status === "approved"
        ).length;
        const pendingAccess = accessRequests.filter(
          (r) => r.status === "pending"
        ).length;

        setStats({
          projects: {
            total: projects.length,
            approved: approvedProjects,
            pending: pendingProjects,
            rejected: rejectedProjects,
            draft: draftProjects,
          },
          accessRequests: {
            total: accessRequests.length,
            approved: approvedAccess,
            pending: pendingAccess,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.department && userData?.studentId) fetchStats();
  }, [userData, currentUser]);

  return (
    <div className="space-y-6">
      <Header title="Dashboard" />

      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="space-y-4 pb-12 md:pb-0">
            <h1 className="text-2xl font-semibold text-black dark:text-white px-3">
              Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3">
              <StatCard
                title="Total Projects"
                value={stats.projects?.total || 0}
                icon={Folder}
                bgColor="bg-indigo-500"
              />
              <StatCard
                title="Approved Projects"
                value={stats.projects?.approved || 0}
                icon={CheckCircle}
                bgColor="bg-green-500"
              />
              <StatCard
                title="Pending Projects"
                value={stats.projects?.pending || 0}
                icon={Clock}
                bgColor="bg-yellow-500"
              />
              <StatCard
                title="Rejected Projects"
                value={stats.projects?.rejected || 0}
                icon={XCircle}
                bgColor="bg-red-500"
              />
              <StatCard
                title="Draft Projects"
                value={stats.projects?.draft || 0}
                icon={FileClock}
                bgColor="bg-gray-500"
              />
              <StatCard
                title="Access Requests"
                value={stats.accessRequests?.total || 0}
                icon={Lock}
                bgColor="bg-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3">
              <RecentProjects />
              <AccessRequestList />
            </div>

            <div className="grid grid-cols-1 gap-6 px-3 pb-8">
              <QuickActions />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
