import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lecturerService } from "../../../services/lecturerService";
import useToast from "../../../contexts/ToastContext";
import TextArea from "../../../components/ui/Textarea";
import Button from "../../../components/ui/Button";
import logLecturerAction from "../../../utils/logLecturerAction";

const RejectModel = ({
  open,
  onClose,
  project,
  lecturerData,
  type,
  title,
  description,
  submitText,
}) => {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useToast();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;
  console.log("RejectModel project:", project);

  const handleReject = async () => {
    if (!reason.trim()) {
      notifyError("Please provide a reason for rejection.");
      return;
    }

    try {
      setLoading(true);

      if (type === "submission") {
        const submissionPayload = {
          updateStatus: "rejected",
          submissionRejectionReason: reason.trim(),
          supervisedBy: lecturerData.lecturerId,
          accessLevel: "public",
          ...project,
        };

        await lecturerService.updateSubmissionStatus("rejected", submissionPayload);

        await logLecturerAction({
          lecturerData,
          action: "Submission Rejected",
          project: {
            projectId: project?.projectId,
            projectTitle: project?.title,
            studentId: project?.studentId,
          },
          status: "rejected",
        });

      } else if (type === "access-request") {
        const accessRequestPayload = {
          accessRequestId: project?.id,
          department: project?.department,
          updateStatus: "rejected",
          requestRejectionReason: reason.trim(),
          respondedBy: lecturerData.lecturerId,
        };

        await lecturerService.reviewAccessRequest(accessRequestPayload);

        await logLecturerAction({
          lecturerData,
          action: "Access Request Rejected",
          project: {
            projectId: project?.projectId,
            projectTitle: project?.projectTitle,
            studentId: project?.requestedBy,
          },
          status: "rejected",
        });
      }

      notifySuccess("Rejected successfully!");
      setReason("");
      onClose();
      navigate(-1, { replace: true });

    } catch (err) {
      console.error("❌ Error rejecting:", err);
      notifyError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reject-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-[var(--color-dark-surface)] rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        <TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason..."
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={handleClose} disabled={loading} variant="outline">
            Cancel
          </Button>

          <Button onClick={handleReject} disabled={loading} variant="danger">
            {loading ? "Rejecting..." : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RejectModel;
