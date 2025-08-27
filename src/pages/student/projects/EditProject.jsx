import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import useToast from "../../../contexts/ToastContext";
import { Save, X } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import useUploadFile from "../../../hooks/useUploadFile";
import { projectService } from "../../../services/projectService";
import UseStudentData from "../../../hooks/useStudentData";
import { logStudentAction } from "../../../utils/logStudentAction";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import Select from "../../../components/ui/Select";

const EditProject = () => {
  const { notifySuccess, notifyError } = useToast();
  const { currentUser, loading } = useAuth();
  const { uploadFile } = useUploadFile();
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const projectYearOptions = Array.from(
    { length: currentYear - 2016 },
    (_, i) => {
      const year = 2017 + i;
      return { value: year.toString(), label: year.toString() };
    }
  );

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    supervisor: "",
    projectYear: "",
    fileURL: "",
    department: "",
  });
  const { userData, loading: userDataLoading } = UseStudentData(
    !loading ? currentUser?.uid : null
  );
  const [file, setFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!userData?.department || !projectId) return;

      try {
        const res = await projectService.getProjectById(
          userData.department,
          projectId
        );
        if (res) {
          setFormData((prev) => ({
            ...prev,
            ...res,
            title: res?.title || "",
            abstract: res?.abstract || "",
            supervisor: res?.supervisor || "",
            projectYear: res?.projectYear || "",
            fileURL: res?.fileURL || "",
            department: res?.department || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [userData?.department, projectId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.abstract || !formData.supervisor) {
      notifyError("Please fill all required fields.");
      return;
    }

    try {
      setIsUpdating(true);

      let fileURL = formData.fileURL;

      if (file && typeof file !== "string") {
        const uploadRes = await uploadFile(file, "project_files");
        if (!uploadRes.success) throw new Error("File upload failed");
        fileURL = uploadRes.url;
      }

      const updatedPayload = {
        ...formData,
        fileURL,
        status: ["draft", "rejected"].includes(formData.status)
          ? "pending"
          : formData.status,
        rejectionReason: ["draft", "rejected"].includes(formData.status)
          ? ""
          : formData.rejectionReason || "",
        projectId,
      };

      const res = await projectService.projectUpdateData(updatedPayload);

      if (res.data.success) {
        await logStudentAction({
          user: currentUser,
          action: "updated project",
          project: formData,
        });
        notifySuccess("Project updated successfully!");
        navigate("/student/projects/drafts", {
          replace: true,
        });
      } else {
        notifyError("Failed to update project.");
      }
    } catch (err) {
      console.error("Update error:", err.message);
      notifyError("An error occurred while updating the project.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header title="Edit Project" backTo="/student/projects/my" showBack />

      {loading || userDataLoading ? (
        <FullPageLoader />
      ) : (
        <form
          onSubmit={handleUpdate}
          className="space-y-6 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-4 rounded-lg shadow-md w-[90%] mx-auto"
        >
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <TextArea
            label="Abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            rows={6}
            required
          />

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select
                label="Project Year"
                name="projectYear"
                value={formData.projectYear}
                onChange={handleChange}
                options={projectYearOptions}
                required
              />
            </div>

            <div className="flex-1">
              <Input
                label="Supervisor Name"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                required
                placeholder="Supervisor's full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700">
              Project File (DOC, DOCX)
            </label>
            <div
              className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800"
              onClick={() => document.getElementById("fileInput").click()}
              role="button"
              tabIndex={0}
            >
              {file ? (
                <div className="flex items-center justify-between w-full max-w-md bg-white dark:bg-gray-900 rounded-md p-3 shadow-sm">
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {file.name}
                  </p>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                    aria-label="Remove file"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {formData.fileURL ? (
                    <>Current file: {formData.fileURL.split("/").pop()}</>
                  ) : (
                    "Click to upload a new file (optional)"
                  )}
                </div>
              )}
              <input
                type="file"
                id="fileInput"
                name="file"
                accept=".doc,.docx"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              icon={<Save size={16} />}
              isLoading={isUpdating}
              disabled={formData.status === "pending" ? true : false}
            >
              {formData.status === "draft" ? "Save Changes" : "Update Project"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProject;
