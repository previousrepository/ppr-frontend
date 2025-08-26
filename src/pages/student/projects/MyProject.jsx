import { useState, useEffect } from "react";
import Header from "../../../components/ui/Header";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/EmptyState";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { projectService } from "../../../services/projectService";
import { useAuth } from "../../../hooks/useAuth";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import HeaderActions from "../../../components/ui/HeaderActions";
import UseStudentData from "../../../hooks/useStudentData";

const MyProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortValue, setSortValue] = useState("newest");
  const { userData } = UseStudentData(currentUser?.uid);


useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data = await projectService.getMyProjects(
        userData?.studentId,
        userData?.department
      );
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userData?.studentId && userData?.department) {
    fetchProjects();
  }
}, [userData?.studentId, userData?.department]);

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
        title="My Projects"
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
          title="No Projects Found"
          subtitle="Try adjusting your filters or submit a new project!"
        >
          <Link
            to="/student/projects/submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Submit New Project
          </Link>
        </EmptyState>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 px-4 md:px-6 my-10">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProject;