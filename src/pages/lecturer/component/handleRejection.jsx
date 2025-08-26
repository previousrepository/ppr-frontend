import { lecturerService } from "@/services/lecturerService";
import { logLecturerAction } from "@/utils/logLecturerACtion";

const handleRejection = async ({
  project,
  lecturerData,
  reason,
  type = "submission",
  notifySuccess,
  notifyError,
  onSuccess,
}) => {
  try {
    if (!reason || !lecturerData?.lecturerId) {
      notifyError("Missing required information");
      return;
    }

    const payload = {
      updateStatus: "rejected",
      submissionRejectionReason: reason,
      supervisedBy: lecturerData.lecturerId,
      accessLevel: "public",
      ...project,
    };

    if (type === "submission") {
        
      await lecturerService.updateSubmissionStatus("rejected", payload);
    } else if (type === "access-request") {
      await lecturerService.updateAccessRequestStatus(
        project.id,
        "rejected",
        lecturerData.lecturerId,
        reason
      );
    }

    await logLecturerAction({
      lecturerData,
      action: type === "submission" ? "Submission Rejected" : "Access Request Rejected",
      project: payload,
      status: "rejected",
    });

    notifySuccess("Rejected successfully!");
    onSuccess?.();
  } catch (err) {
    console.error("❌ Error rejecting:", err);
    notifyError("Something went wrong.");
  }
};

export default handleRejection;