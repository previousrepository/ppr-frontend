import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useStudentData from "../../hooks/useStudentData";
import RequestAccessModal from "../ui/RequestAccessModal";
import Header from "../ui/Header";
import { projectService } from "../../services/projectService";
import Button from "../ui/Button";
import clsx from "clsx";
import FullPageLoader from "../ui/FullPageLoader";
import {
  FileText,
  Calendar,
  User,
  Eye,
  Lock,
  BookOpen,
  Download,
  Key,
  CheckCircle2,
} from "lucide-react";

const ViewProject = () => {
  const { id: projectId, department } = useParams();
  const { currentUser } = useAuth();
  const { userData } = useStudentData(currentUser?.uid);

  const [project, setProject] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessRequests, setAccessRequests] = useState([]);
  const [approvedAccess, setApprovedAccess] = useState(false);

  const accessStyles = {
    public:
      "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
    owner: "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20",
    restricted: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20",
  };

  const isOwner = project?.admissionNumber === userData?.admissionNumber;
  const isStaff = userData?.staffRole === "academic";
  const accessLevel = isOwner ? "owner" : project?.accessLevel ?? "public";
  const canDownload =
    accessLevel === "public" || isOwner || isStaff || approvedAccess;

  useEffect(() => {
    const fetchProjectAndRequests = async () => {
      const dept = department || userData?.department;
      if (!projectId || !dept) return;

      try {        
        const res = await projectService.getProjectById( dept, projectId);

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
        }
        
        if(!department) return;

        const accessRes = await projectService.accessRequestHistory(
          userData?.studentId,
          dept
        );

        setAccessRequests(accessRes || []);

        const isApproved = accessRes?.some(
          (req) => req.projectId === projectId && req.status === "approved"
        );
        setApprovedAccess(isApproved);
      } catch (err) {
        console.error("Error fetching project or access requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndRequests();
  }, [department, userData, projectId]);

  return (
    <>
      <Header title="View Project" backTo="/student/projects/my" showBack />

      {loading || !userData || !project ? (
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
                  isOwner
                    ? "You are the owner of this project"
                    : accessLevel === "restricted"
                    ? "Restricted access — request required"
                    : "This project is public"
                }
                className={clsx(
                  "px-3 py-1 text-xs rounded-full font-semibold capitalize shadow-sm whitespace-nowrap inline-flex items-center gap-1",
                  accessStyles[accessLevel]
                )}
              >
                {accessLevel === "restricted" ? (
                  <Lock className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                {accessLevel}
              </span>
            </div>

            {approvedAccess && accessLevel === "restricted" && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Access request approved — you can now download the file.
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
              {canDownload ? (
                <a
                  href={project.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${project.title}.docx`}
                  aria-label={`Download project "${project.title}" as Word Document`}
                >
                  <Button
                    variant="primary"
                    icon={<Download className="size-4 mr-1" />}
                  >
                    Download DOC
                  </Button>
                </a>
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => setShowRequestModal(true)}
                  aria-label="Request access to download project file"
                  icon={<Key className="w-4 h-4" />}
                >
                  Request Access
                </Button>
              )}
            </div>
          </div>
        </main>
      )}

      <RequestAccessModal
        open={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        project={project}
      />
    </>
  );
};

export default ViewProject;
