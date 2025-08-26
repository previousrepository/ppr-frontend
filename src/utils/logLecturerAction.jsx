import ActivityLogs from "../pages/lecturer/component/ActivityLog";

const logLecturerAction = async ({ lecturerData, action, project, status }) => {
  
  if (!lecturerData || !project) {
    console.warn("Activity log skipped: missing user or project info");
    return;
  }

  console.log(lecturerData, project, action, status);

  await ActivityLogs({
    projectId: project?.projectId,
    projectTitle: project?.title,
    performedByLecturerId: lecturerData?.lecturerId,
    performedByName: lecturerData?.fullName,
    performedByRole: lecturerData?.role,
    action,
    department: lecturerData?.department,
    status: status,
  });
};


export default logLecturerAction;