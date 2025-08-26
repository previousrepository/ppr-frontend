import { useEffect, useState } from "react";
import { db } from "../config/firebase"; // adjust if needed
import { useAuth } from "./useAuth"; // assuming department/user context is needed

export const useDashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const department = user?.department;
        const projectsSnap = await db
          .collection("Projects")
          .doc(department)
          .collection("submitted")
          .get();

        const accessReqSnap = await db
          .collection("Projects")
          .doc(department)
          .collection("accessRequests")
          .get();

        let total = 0;
        let approved = 0;
        let pending = 0;

        projectsSnap.forEach((doc) => {
          const data = doc.data();
          total++;
          if (data.status === "approved") approved++;
          if (data.status === "pending") pending++;
        });

        setStats({
          total,
          approved,
          pending,
          accessRequests: accessReqSnap.size,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStats();
  }, [user]);

  return { stats, loading };
};
