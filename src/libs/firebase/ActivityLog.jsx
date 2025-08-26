import { projectService } from "../../services/projectService";

const ActivityLogs = async ({
  projectId,
  projectTitle,
  performedByStudentId,
  performedByName,
  performedByRole,
  action,
  department,
  status,
}) => {
  try {
    const payload = {
      projectId,
      projectTitle,
      performedByStudentId,
      performedByName,
      performedByRole,
      action,
      department,
      status,
    };

    const res = await projectService.activityLog(payload);

    if (!res.data.success) {
      console.warn("⚠️ Activity log not saved:", res.data.message);
    }
  } catch (err) {
    console.error("❌ Failed to send activity log:", err.message);
  }
};

export default ActivityLogs;
