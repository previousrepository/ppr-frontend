import ActivityLogs from "../libs/firebase/ActivityLog";
export const logStudentAction = async ({ userData , action, project, status }) => {
  
  if (!userData || !project) {
    console.warn("Activity log skipped: missing user or project info");
    return;
  }

  
  await ActivityLogs({
    projectId: project?.projectId,
    projectTitle: project?.title || project?.projectTitle,
    performedByStudentId: userData?.studentId,
    performedByName: userData?.fullName,
    performedByRole: userData?.role,
    action,
    department: userData?.department || "General",
    status: status || "pending",
  });
};
