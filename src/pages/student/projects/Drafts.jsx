import FullPageLoader from "../../../components/ui/FullPageLoader";
import useStudentProjects from "../../../hooks/useStudentProjects";
import EmptyState from "../components/EmptyState";
import Header from "../../../components/ui/Header";
import ProjectCard from "../components/ProjectCard";

const Drafts = () => {
  const { drafts, loading } = useStudentProjects();

  return (
    <div className="pb-16 md:pb-4 space-y-4">
      <Header
        title="Drafts"
        backTo="/student/projects"
        showBack={true}
      />

      {loading ? (
        <FullPageLoader />
      ) : drafts.length === 0 ? (
        <div className="px-4 md:px-8">
          <EmptyState
            title="No Drafts Yet"
            description="You haven't saved any projects as drafts. Start a new project and it will appear here if saved."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-6">
          {drafts.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Drafts;
