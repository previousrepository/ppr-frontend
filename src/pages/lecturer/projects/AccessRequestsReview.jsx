import { useEffect, useState } from "react";
import { lecturerService } from "../../../services/lecturerService";
import { useAuth } from "../../../hooks/useAuth";
import UseLecturerData from "../../../hooks/useLecturerData";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import EmptyState from "../component/EmptyState";
import AccessRequestCard from "../component/AccessRequestCard";
import Header from "../../../components/ui/Header";

const AccessRequestsReview = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData: lecturerData } = UseLecturerData(currentUser?.uid);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!lecturerData?.department) return;

      try {
        const data = await lecturerService.getAccessRequests(lecturerData.department);
        setRequests(data || []);
      } catch (err) {
        console.error("Error loading requests:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (lecturerData?.department) fetchRequests();
  }, [lecturerData?.department]);

  return (
    <div className="space-y-4">
      <Header title="Access Requests" showBack={true} />

      {loading ? (
        <FullPageLoader />
      ) : requests.length === 0 ? (
        <EmptyState title="No access requests yet." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 px-4 md:px-6">
          {requests.map((req) => (
            <AccessRequestCard
              key={req.id}
              request={req}
              lecturer={lecturerData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessRequestsReview;
