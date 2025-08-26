import api from "./api";

export const lecturerService = {
  // Submissions
  getDepartmentSubmissions: (department) =>
    api.get(`/lecturer/submissions/${department}`).then(res => res.data.data),

  getProjectById: (department, projectId) =>
    api.get(`/lecturer/project/${department}/${projectId}`).then(res => res.data.data),

  updateSubmissionStatus: (status, payload) =>
    api.patch(`/lecturer/submissions/${status}`, payload),

  // Access Requests
  getAccessRequests: (department) =>
    api.get(`/lecturer/access-requests/${department}`).then(res => res.data.data),

  reviewAccessRequest: (payload) =>
    api.patch(`/lecturer/access-requests/review`, payload),

  // Activity Logs
  getActivityLogs: (department) => api.get(`/lecturer/activity-logs/${department}`).then(res => res.data.data),

  activityLog: (payload) => api.post("/activity/logs", payload)
};
