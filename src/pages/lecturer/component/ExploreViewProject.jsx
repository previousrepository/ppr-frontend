import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import UseLecturerData from "../../../hooks/useLecturerData";
import Header from "../../../components/ui/Header";
import { projectService } from "../../../services/projectService";
import Button from "../../../components/ui/Button";
import clsx from "clsx";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import {
  FileText,
  Calendar,
  User,
  Eye,
  Lock,
  BookOpen,
  Download,
  CheckCircle2,
} from "lucide-react";
import { lecturerService } from "../../../services/lecturerService";

const ExploreViewProject = () => {
  const { id: projectId } = useParams();
  const { currentUser } = useAuth();
  const { userData: lecturerData } = UseLecturerData(currentUser?.uid);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const accessStyles = {
    public:
      "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
    restricted:
      "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20",
  };

  const isAcademicStaff = lecturerData?.staffType === "academic";
  const sameDepartment = lecturerData?.department === project?.department;

  const canDownload =
    project?.accessLevel === "public" ||
    (isAcademicStaff && sameDepartment);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId || !lecturerData?.department) return;
      try {
        const res = await lecturerService.getProjectById(
          lecturerData.department,
          projectId
        );

        if (res) {
          setProject({
            ...res,
            title: res.title || "Untitled Project",
            abstract: res.abstract || "No abstract provided.",
            supervisor: res.supervisor || "N/A",
            fileURL: res.fileURL || "",
            department: res.department || "N/A",
            projectYear: res.projectYear || "N/A",
          });
          console.log("Project data:", res.fileURL);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [lecturerData, projectId]);

  return (
    <>
      <Header
        title="View Project"
        backTo="/lecturer/explore"
        showBack
      />

      {loading || !project ? (
        <FullPageLoader />
      ) : (
        <main className="flex justify-center px-4 mt-8">
          <div className="w-full max-w-4xl space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] transition-all">
            <div className="flex justify-between items-start bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm text-gray-600 dark:text-gray-100 md:text-lg font-semibold">
              <div className="flex items-center gap-2">
                <BookOpen className="text-blue-500" />
                <span>
                  <strong>Title:</strong> {project.title}
                </span>
              </div>

              <span
                title={
                  project.accessLevel === "restricted"
                    ? "Restricted access — only staff in same department can download"
                    : "This project is public"
                }
                className={clsx(
                  "px-3 py-1 text-xs rounded-full font-semibold capitalize shadow-sm whitespace-nowrap inline-flex items-center gap-1",
                  accessStyles[project.accessLevel]
                )}
              >
                {project.accessLevel === "restricted" ? (
                  <Lock className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                {project.accessLevel}
              </span>
            </div>

            {canDownload && project.accessLevel === "restricted" && (
              <div className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                You're a lecturer in this department
              </div>
            )}

            <div className="flex flex-col gap-4 bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-4 rounded-xl shadow-sm text-gray-600 dark:text-gray-100">
              <div className="flex items-start gap-2">
                <FileText className="text-fuchsia-500" />
                <span>
                  <strong>Abstract:</strong> {project.abstract}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User className="text-purple-500" />
                <span>
                  <strong>Supervisor:</strong> {project.supervisor}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="text-amber-500" />
                <span>
                  <strong>Project Year:</strong> {project.projectYear}
                </span>
              </div>
            </div>

            <div className="pt-2 w-full flex justify-end">
              {canDownload && project.fileURL ? (
                <a
                  href={project.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${project.title}.pdf`}
                  aria-label={`Download project "${project.title}" as PDF`}
                >
                  <Button
                    variant="primary"
                    icon={<Download className="size-4 mr-1" />}
                  >
                    Download PDF
                  </Button>
                </a>
              ) : null}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ExploreViewProject;
