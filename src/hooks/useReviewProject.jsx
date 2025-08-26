import { useEffect, useState } from "react";
import { lecturerService } from "../services/lecturerService";
import UseStudentData from "./useStudentData";

const useReviewProject = (type, department, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [projectData, setProjectData] = useState(null);

  const userId = rawData?.submittedBy || rawData?.requestedBy;
  const { userData: student } = UseStudentData(userId);

  useEffect(() => {
    const fetchData = async () => {
      if (!type || !department || !id) return;

      try {
        setLoading(true);
        let combinedData = {};

        if (type === "submission") {
          const submissionData = await lecturerService.getProjectById(department, id);
          if (!submissionData) throw new Error("Submission not found");
          setProjectData(submissionData);
          combinedData = submissionData;
        } 
        
        else if (type === "access-request") {
          const project_data = await lecturerService.getProjectById(department, id);
          const allRequests = await lecturerService.getAccessRequests(department);
          const request_data = allRequests.find((req) => req.projectId === id);

          if (!request_data) throw new Error("Access request not found");

          combinedData = {
            ...project_data,
            ...request_data,
          };
          setRequestData(request_data);
        }

        if (!combinedData) throw new Error("No data found");

        setRawData(combinedData);
      } catch (err) {
        setError(err);
        console.error("useReviewProject error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, department, id]);

  useEffect(() => {
    if (!rawData || !student) return;

    const normalized = {
      type,
      id: rawData.accessRequestId ,
      projectId: rawData.projectId,
      projectTitle: rawData.title || rawData.projectTitle || "Untitled Project",
      abstract: rawData.abstract || "No abstract provided.",
      supervisor: rawData.supervisor || "N/A",
      fileURL: rawData.fileURL || null,
      projectYear: rawData.projectYear || "N/A",
      department: rawData.department || department,
      studentInfo: {
        fullName: student?.fullName || "Unknown",
        admissionNumber: student?.admissionNumber || "Unknown",
        uid: student?.studentId,
      },
      status: rawData.status || "pending",
      submittedAt: rawData.submittedAt || null,
      requestedAt: rawData.requestedAt || null,
      requestReason: rawData.requestReason || "",
    };

    setData(normalized);
  }, [type, rawData, department, student]);

  return { data, loading, error, requestData, projectData };
};

export default useReviewProject;
