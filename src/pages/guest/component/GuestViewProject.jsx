import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collectionGroup, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../../libs/firebase/config";
import Header from "../../../components/ui/Header";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import Button from "../../../components/ui/Button";
import { BookOpen, FileText, Calendar, User, Download } from "lucide-react";

const GuestViewProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(projectId)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(
          collectionGroup(db, "projectSubmissions"),
          where("projectId", "==", projectId),
          limit(1)
        );

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setProject({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  return (
    <>
      <Header title="View Project" backTo="/guest/explore" showBack />

      {loading || !project ? (
        <FullPageLoader />
      ) : (
        <main className="flex justify-center px-4 mt-8">
          <div className="w-full max-w-4xl space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]">
            <div className="flex justify-between items-start px-3 py-2 rounded-xl shadow-sm bg-white/60 dark:bg-gray-700/20">
              <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold">
                <BookOpen className="text-blue-500" />
                <span>
                  <strong>Title:</strong> {project.title}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-3 py-4 rounded-xl shadow-sm bg-white/60 dark:bg-gray-700/20 text-gray-600 dark:text-gray-100">
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
              <a
                href={project.fileURL}
                target="_blank"
                rel="noopener noreferrer"
                download={`${project.title}.docx`}
              >
                <Button variant="primary" icon={<Download className="size-4 mr-1" />}>
                  Download DOC
                </Button>
              </a>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default GuestViewProject;
