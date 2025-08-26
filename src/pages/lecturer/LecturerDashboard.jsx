import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../libs/firebase/config";
import { useAuth } from "../../hooks/useAuth";
import UseLecturerData from "../../hooks/useLecturerData";
import Header from "../../components/ui/Header";
import StatCard from "./component/StatCard";
import RecentSubmissions from "./component/RecentSubmissions";
import AccessRequestList from "./component/AccessRequestList";
import QuickActions from "./component/QuickActions";
import FullPageLoader from "../../components/ui/FullPageLoader";
import { CheckCircle, Clock, Lock, XCircle } from "lucide-react";

const LecturerDashboard = () => {
  const [stats, setStats] = useState({
    pendingReviews: 0,
    approvedProjects: 0,
    rejectedProjects: 0,
    accessRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);

  const { currentUser } = useAuth();
  const { userData } = UseLecturerData(currentUser?.uid);
  const isAcademic = userData?.staffType?.toLowerCase() === "academic";

useEffect(() => {
  if (!userData?.department) return;

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const allProjectsSnap = await getDocs(
        collection(db, `Projects/${userData.department}/projectSubmissions`)
      );
      const allProjects = allProjectsSnap.docs.map((doc) => doc.data());

      const pendingReviews = allProjects.filter(
        (p) => (p.status || "").toLowerCase() === "pending"
      ).length;
      const approvedProjects = allProjects.filter(
        (p) => (p.status || "").toLowerCase() === "approved"
      ).length;
      const rejectedProjects = allProjects.filter(
        (p) => (p.status || "").toLowerCase() === "rejected"
      ).length;

      const allRequestsSnap = await getDocs(
        query(
          collection(db, `Projects/${userData.department}/accessRequests`),
          where("status", "==", "pending")
        )
      );
      const allRequests = allRequestsSnap.docs.map((doc) => doc.data());
      const accessRequestsCount = allRequests.length;

      const recentProjectsQuery = query(
        collection(db, `Projects/${userData.department}/projectSubmissions`),
        orderBy("submittedAt", "desc"),
        limit(10)
      );
      const recentProjectsSnap = await getDocs(recentProjectsQuery);
      const fetchedProjects = recentProjectsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const recentRequestsQuery = query(
        collection(db, `Projects/${userData.department}/accessRequests`),
        orderBy("requestedAt", "desc"),
        limit(10)
      );
      const recentRequestsSnap = await getDocs(recentRequestsQuery);
      const fetchedRequests = recentRequestsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStats({
        pendingReviews,
        approvedProjects,
        rejectedProjects,
        accessRequests: accessRequestsCount,
      });
      setProjects(fetchedProjects);
      setRequests(fetchedRequests);
    } catch (error) {
      console.error("Error fetching lecturer dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardStats();
}, [userData]);


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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-3">
              <StatCard
                title="Pending Reviews"
                value={stats.pendingReviews}
                icon={Clock}
                bgColor="bg-yellow-500"
              />
              <StatCard
                title="Approved Projects"
                value={stats.approvedProjects}
                icon={CheckCircle}
                bgColor="bg-green-500"
              />
              <StatCard
                title="Rejected Projects"
                value={stats.rejectedProjects}
                icon={XCircle}
                bgColor="bg-red-500"
              />
              <StatCard
                title="Access Requests"
                value={stats.accessRequests}
                icon={Lock}
                bgColor="bg-purple-500"
              />
            </div>

            {isAcademic && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3 mt-4">
                  <RecentSubmissions projects={projects} />
                  <AccessRequestList requests={requests} />
                </div>

                <div className="grid grid-cols-1 gap-6 px-3 pb-8">
                  <QuickActions />
                </div>
              </>
            )}

            
          </div>
        </>
      )}
    </div>
  );
};

export default LecturerDashboard;
