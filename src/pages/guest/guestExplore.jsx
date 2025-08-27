import { useEffect, useState } from "react";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db } from "../../libs/firebase/config";
import Header from "../../components/ui/Header";
import EmptyState from "./component/EmptyState";
import HeaderActions from "../../components/ui/HeaderActions";
import FullPageLoader from "../../components/ui/FullPageLoader";
import ExploreCard from "./component/ExploreCard";
import { useNavigate } from "react-router-dom";
import { auth } from "../../libs/firebase/config";

const GuestExplore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [status, setStatus] = useState("all");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedProjects = async () => {
      try {
        const q = query(
          collectionGroup(db, "projectSubmissions"),
          where("status", "==", "approved"),
          where("accessLevel", "==", "public")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          projectId: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (err) {
        console.error("Error fetching approved projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedProjects();
  }, []);

  const filteredProjects = projects?.filter((project) => {
      const title = project.title || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="pb-16 md:pb-4 space-y-6 h-screen">
      <Header
        title="Explore Projects"
        rightContent={
          <HeaderActions
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showFilter={false}
            onLogout={() => {
              auth.signOut();
              navigate("/login");
            }}
          />
        }
      />

      {isLoading ? (
        <FullPageLoader />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title="No Projects Found"
          description="Try adjusting your filters or search terms."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-12 md:pb-0 px-4">
          {filteredProjects.map((project) => (
            <ExploreCard key={project.projectId} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestExplore;
