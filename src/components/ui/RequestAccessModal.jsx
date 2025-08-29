import { useState } from "react";
import { projectService } from "../../services/projectService";
import { useAuth } from "../../hooks/useAuth";
import UseStudentData from "../../hooks/useStudentData";
import useToast from "../../contexts/ToastContext";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { logStudentAction } from "../../utils/logStudentAction";
import { useNavigate } from "react-router-dom";
import { FileLock } from "lucide-react";

const RequestAccessModal = ({ open, onClose, project }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { userData } = UseStudentData(currentUser?.uid);
  const { notifySuccess, notifyError } = useToast();
  const [requestReason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

const handleRequest = async () => {
  if (!requestReason.trim()) {
    notifyError("Please provide a reason for your request.");
    return;
  }

  if (!project?.projectId) {
    notifyError("Invalid project. Please try again.");
    return;
  }

  if(project.department !== userData?.department) {
    notifyError("You can only request access to projects in your department."); 
    return;
  }

  try {
    setLoading(true);

    const payload = {
      projectId: project.projectId,
      projectTitle: project.title,
      requestedBy: userData?.studentId,
      department: userData?.department,
      status: "pending",
      requestReason: requestReason.trim(),
    };

    await projectService.requestAccess(project.projectId, payload);

    await logStudentAction({
      userData,
      action: "Requesting access to project",
      project,
      status: "pending",
    });

    notifySuccess("Access request sent successfully!");
    setReason("");
    onClose();
    navigate(-1, { replace: true });
  } catch (err) {
    console.error(err);
    if (err?.response?.status === 400) {
      notifyError(err.response.data.message);
    } else {
      notifyError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900/50 rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <FileLock className="text-gray-700 dark:text-white" size={20} />
          <h2 className="text-lg md:text-xl font-semibold dark:text-white">
            Request Access
          </h2>
        </div>
        <p className="text-sm md:text-md text-gray-600 dark:text-gray-300 mb-4">
          Please explain why you need access to this project.
        </p>

        <TextArea
          value={requestReason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Write your reason..."
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose} disabled={loading} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleRequest} disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestAccessModal;
