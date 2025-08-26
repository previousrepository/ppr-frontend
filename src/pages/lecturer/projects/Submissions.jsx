import { useState, useEffect } from "react";
import Header from "../../../components/ui/Header";
import ProjectCard from "../component/ProjectCard";
import EmptyState from "../component/EmptyState";
import { useAuth } from "../../../hooks/useAuth";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import HeaderActions from "../../../components/ui/HeaderActions";
import { lecturerService } from "../../../services/lecturerService";
import UseLecturerData from "../../../hooks/useLecturerData";

const Submissions = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortValue, setSortValue] = useState("newest");
  const { userData } = UseLecturerData(currentUser?.uid);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await lecturerService.getDepartmentSubmissions(userData?.department);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      } finally {
        setLoading(false);
      }
    };

  if (userData?.department) {
    fetchProjects();
  }
  }, [userData?.department]);

  const filteredProjects = projects
    .filter((project) => {
      if (statusFilter === "all") return true;
      return project.status === statusFilter;
    })
    .filter((project) => {
      const title = project.title || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortValue === "newest") {
        return b.submittedAt?.toMillis?.() - a.submittedAt?.toMillis?.();
      }
      if (sortValue === "oldest") {
        return a.submittedAt?.toMillis?.() - b.submittedAt?.toMillis?.();
      }
      if (sortValue === "title_asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortValue === "title_desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="space-y-6 pb-2 md:pb-4">
      <Header
        title="Department Submissions"
        showBack={true}
        rightContent={
          <HeaderActions
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            // showSort={true}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
        }
      />

      {loading ? (
        <FullPageLoader />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title="No Submissions Available"
          subtitle="There are no student submissions yet. You can check back later."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 px-4 md:px-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissions;