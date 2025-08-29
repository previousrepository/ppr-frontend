import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../libs/firebase/config";
import { useAuth } from "../../hooks/useAuth";
import UseStudentData from "../../hooks/useStudentData";
import Header from "../../components/ui/Header";
import RecentProjects from "./components/RecentProjects";
import AccessRequestList from "./components/AccessRequestList";
import QuickActions from "./components/QuickActions";
import FullPageLoader from "../../components/ui/FullPageLoader";
import StatCard from "../../components/public/StatCard";
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

        setStats({
          projects: {
            total: projects.length,
            approved: projects.filter((p) => p.status === "approved").length,
            pending: projects.filter((p) => p.status === "pending").length,
            rejected: projects.filter((p) => p.status === "rejected").length,
            draft: projects.filter((p) => p.status === "draft").length,
          },
          accessRequests: {
            total: accessRequests.length,
            approved: accessRequests.filter((r) => r.status === "approved").length,
            pending: accessRequests.filter((r) => r.status === "pending").length,
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

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects?.total || 0,
      icon: Folder,
      bgColor: "bg-indigo-500",
    },
    {
      title: "Approved Projects",
      value: stats.projects?.approved || 0,
      icon: CheckCircle,
      bgColor: "bg-green-500",
    },
    {
      title: "Pending Projects",
      value: stats.projects?.pending || 0,
      icon: Clock,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Rejected Projects",
      value: stats.projects?.rejected || 0,
      icon: XCircle,
      bgColor: "bg-red-500",
    },
    {
      title: "Draft Projects",
      value: stats.projects?.draft || 0,
      icon: FileClock,
      bgColor: "bg-gray-500",
    },
    {
      title: "Access Requests",
      value: stats.accessRequests?.total || 0,
      icon: Lock,
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <Header title="Dashboard" />

      {loading ? (
        <FullPageLoader />
      ) : (
        <div className="space-y-4 pb-12 md:pb-0">
          <h1 className="text-2xl font-semibold text-black dark:text-white px-3">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3">
            {statCards.map((card, idx) => (
              <StatCard key={idx} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3">
            <RecentProjects />
            <AccessRequestList />
          </div>

          <div className="grid grid-cols-1 gap-6 px-3 pb-8">
            <QuickActions />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
