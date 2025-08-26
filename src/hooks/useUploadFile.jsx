import { projectService } from "../services/projectService";

const useUploadFile = () => {
  const uploadFile = async (file, folder = "projects") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await projectService.submitProject(formData);
      return { success: true, url: response.data.url };
    } catch (error) {
      console.error("Upload error:", error);
      return { success: false, error };
    }
  };

  return { uploadFile };
};

export default useUploadFile;
