import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";
import { logStudentAction } from "../../utils/logStudentAction";

const createProject = async (projectData, department, projectId, userData) => {
  try {
    const projectRef = doc(db, "Projects", department, "projectSubmissions", projectId);

    const dataToStore = {
      ...projectData,
      projectId,
      department,
      submittedAt: serverTimestamp(),
      status: projectData.status || "pending",
    };

    const sanitize = (data) =>
      Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );

    await logStudentAction({ userData, action: "Project submission", project: dataToStore, status: "pending" });
    
    await setDoc(projectRef, sanitize(dataToStore));

    return { success: true, projectId };
  } catch (error) {
    console.error("❌ Error creating project:", error.message);
    return { success: false, error };
  }
};

export default createProject;