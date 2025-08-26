import api from "./api";

const projectService = {
  // My Projects
  getMyProjects: (studentId, department) =>
    api
      .get("/student/my-projects", {
        params: { studentId, department },
      })
      .then((res) => res.data.data),

  getProjectById: (department, projectId) =>
    api.get(`/student/project/${department}/${projectId}`).then(res => res.data.data),

  submitProject: (formData) =>
    api.post("/student/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  projectUpdateData: (updatedPayload) => {
    const { projectId, ...rest } = updatedPayload;
    return api.patch(`/student/update/${projectId}`, rest);
  },

  // Access Requests
  requestAccess: (projectId, requestData) =>
    api.post(`/student/access-requests/${projectId}`, requestData),

  accessRequestHistory: (studentId, department) =>
    api
      .get("/student/access-requests/history", {
        params: { studentId, department },
      })
      .then((res) => res.data.data),

  // Public Projects
  getPublicProjects: () =>
    api.get("/student/explore").then((res) => res.data),

  // Logging (optional)
  activityLog: (payload) => api.post("/activity/logs", payload),

  // Optional (only if needed)
  deleteProject: (id) => api.delete(`/projects/${id}`),
};

export { projectService };
