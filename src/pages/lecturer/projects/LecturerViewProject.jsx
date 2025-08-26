import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import UseLecturerData from "../../../hooks/useLecturerData";
import useReviewProject from "../../../hooks/useReviewProject";
import { format } from "date-fns";
import Header from "../../../components/ui/Header";
import Button from "../../../components/ui/Button";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import RejectModel from "../component/RejectModel";
import InfoModel from "../../../components/ui/InfoModel";
import useToast from "../../../contexts/ToastContext";
import { lecturerService } from "../../../services/lecturerService";
import { User, FileText, Calendar, School, Info, BookOpen, Download, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import logLecturerAction from "../../../utils/logLecturerAction";

const LecturerProjectActionView = () => {
  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.includes("access")
    ? "access-request"
    : "submission";
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { userData: lecturerData } = UseLecturerData(currentUser?.uid);
  const { data: project, loading, requestData, projectData } = useReviewProject(
    type,
    lecturerData?.department,
    id
  );

  const [accessLevel, setAccessLevel] = useState("public");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { notifySuccess, notifyError } = useToast();

  const toggleAccessLevel = (level) => {
    setAccessLevel((prev) => (prev === level ? "public" : level));
  };

  const handleApprove = async () => {
    setProcessing(true);
    try {
      if (type === "submission") {
        await lecturerService.updateSubmissionStatus("approved", {
          ...projectData,
          accessLevel,
          updateStatus: "approved",
          supervisedBy: lecturerData?.lecturerId,
        });
        await logLecturerAction({
          lecturerData,
          action: "Submission approved",
          project: {
            projectId: project?.projectId,
            projectTitle: project?.title,
          },
          status: "approved",
        });
      } else {
        await lecturerService.reviewAccessRequest({
          ...requestData,
          updateStatus: "approved",
          respondedBy: lecturerData?.lecturerId,
        });
        await logLecturerAction({
          lecturerData,
          action: "Access request approved",
          project: {
            projectId: project?.projectId,
            projectTitle: project?.title,
          },
          status: "approved",
        });
      }
      notifySuccess("Approved successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      notifyError("Failed to approve");
    } finally {
      setProcessing(false);
    }
  };  

  const formatTimestamp = (timestamp) => {
    if (!timestamp || typeof timestamp !== "object") return "N/A";
    const seconds = timestamp.seconds ?? timestamp._seconds;
    const date = new Date(seconds * 1000);
    return isNaN(date.getTime()) ? "N/A" : format(date, "PPpp");
  };

  const requestedOrSubmittedAt =
    type === "access-request" ? project?.requestedAt : project?.submittedAt;
  const formattedDate = formatTimestamp(requestedOrSubmittedAt)

  console.log("Project Data:", project);
  

  return (
    <>
      <Header
        title={`View ${
          type === "submission" ? "Submission" : "Access Request"
        }`}
        showBack
      />

      {loading || !project ? (
        <FullPageLoader />
      ) : (
        <main className="flex justify-center px-4 mb-20 mt-8">
          <div className="w-full max-w-3xl space-y-4 border rounded-xl p-6 md:p-8 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]">
            <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-100">
              <div className="bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <User className="text-orange-500" />
                  <span>
                    <strong>Name:</strong> {project.studentInfo.fullName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <School className="text-emerald-500" />
                  <span>
                    <strong>Admission Number:</strong>{" "}
                    {project.studentInfo.admissionNumber}
                  </span>
                </div>
              </div>

              <div className="bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm space-y-3">
                {type === "access-request" && (
                  <>
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-indigo-500" />
                      <span>
                        <strong>Title:</strong> {project.projectTitle}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <FileText className="text-fuchsia-500" />
                      <span>
                        <strong>Abstract:</strong> {project.abstract}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="text-amber-500" />
                      <span>
                        <strong>Requested At:</strong> {formattedDate}
                      </span>
                    </div>
                  </>
                )}

                {type === "submission" && (
                  <>
                    <div className="flex items-start gap-2">
                      <FileText className="text-sky-500" />
                      <span>
                        <strong>Abstract:</strong> {project.abstract}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="text-indigo-500" />
                      <span>
                        <strong>Supervisor:</strong> {project.supervisor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="text-purple-500" />
                      <span>
                        <strong>Project Year:</strong> {project.projectYear}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm space-y-3">
                {type === "access-request" && (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <strong className="text-green-600 font-bold">
                        Reason:
                      </strong>
                      <span>{project.requestReason}</span>
                    </div>
                  </div>
                )}

                {type === "submission" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-md font-semibold">Access Level</h2>
                      <button onClick={() => setShowInfoModal(true)}>
                        <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="access"
                          value="public"
                          checked={accessLevel === "public"}
                          onChange={() => toggleAccessLevel("public")}
                        />
                        <span>Public</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="access"
                          value="restricted"
                          checked={accessLevel === "restricted"}
                          onChange={() => toggleAccessLevel("restricted")}
                        />
                        <span>Restricted</span>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap justify-end gap-4 pt-4">
                {project.fileURL ? (
                  <a
                    href={project.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      icon={<Download className="size-4 mr-1" />}
                    >
                      Download DOC
                    </Button>
                  </a>
                ) : (
                  <Button variant="primary" disabled>
                    DOC Not Available
                  </Button>
                )}
                <Button
                  variant="success"
                  onClick={handleApprove}
                  disabled={processing}
                  icon={<CheckCircle className="text-white w-4 h-4" />}
                >
                  {processing ? "Processing..." : "Approve"}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowRejectModal(true)}
                  disabled={processing}
                  icon={<XCircle className="text-white w-4 h-4" />}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </main>
      )}

      <RejectModel
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        project={project}
        lecturerData={lecturerData}
        type={type}
        title={`Reject ${
          type === "submission" ? "Project Submission" : "Access Request"
        }`}
        description={`Please provide a reason for rejecting this ${
          type === "submission" ? "project" : "request"
        }.`}
        submitText={`Reject ${
          type === "submission" ? "Submission" : "Request"
        }`}
      />

      {showInfoModal && (
        <InfoModel open={showInfoModal} onClose={() => setShowInfoModal(false)}>
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Access Level Explanation</h3>
          <p>
            <strong>Public</strong>: Anyone can view and download this project.
          </p>
          <p>
            <strong>Restricted</strong>: Only abstract is visible. Full DOC
            requires request and approval.
          </p>
        </InfoModel>
      )}
    </>
  );
};

export default LecturerProjectActionView;
