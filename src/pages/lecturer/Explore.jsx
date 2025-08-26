import { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import EmptyState from "./component/EmptyState";
import { projectService } from "../../services/projectService";
import HeaderActions from "../../components/ui/HeaderActions";
import FullPageLoader from "../../components/ui/FullPageLoader";
import { useAuth } from "../../hooks/useAuth";
import ExploreCard from "./component/ExploreCard";
import UseLecturerData from "../../hooks/useLecturerData";

const LecturerExplore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { userData: lecturerData } = UseLecturerData(currentUser?.uid);


useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data = await projectService.getPublicProjects(currentUser?.uid);
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  if (currentUser?.uid) fetchProjects();
}, [currentUser]);

  const filteredProjects = projects
    ?.filter((project) => {
      if (status === "all") return true;
      return project.accessLevel === status;
    })
    ?.filter((project) => {
      const title = project.title || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // const handleSort = (sortType) => {
  //   let sorted = [...projects];
  //   if (sortType === "title_asc") {
  //     sorted.sort((a, b) => a.title.localeCompare(b.title));
  //   } else if (sortType === "title_desc") {
  //     sorted.sort((a, b) => b.title.localeCompare(a.title));
  //   } else if (sortType === "newest") {
  //     sorted.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  //   } else if (sortType === "oldest") {
  //     sorted.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
  //   }
  //   setProjects(sorted);
  // };

  return (
    <div className="pb-16 md:pb-4 space-y-6">
      <Header
        title="Explore Projects"
        rightContent={
          <HeaderActions
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={status}
            onStatusChange={setStatus}
            showSort={true}
            // sortValue={sortValue}
            // onSortChange={handleSort}
            statuses={["all", "public", "restricted"]}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-12 md:pb-0">
          {filteredProjects.map((project) => (
            <ExploreCard
              key={project.projectId}
              project={project}
              lecturerData={lecturerData}
              hasApprovedRequest={project.accessStatus === "approved"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LecturerExplore;