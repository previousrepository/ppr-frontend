import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../libs/firebase/config";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/Textarea";
import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import useToast from "../../../contexts/ToastContext";
import { UploadCloud, Save, X } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import useUploadFile from "../../../hooks/useUploadFile";
import { generateProjectId } from "../../../utils/helper";
import createProject from "../../../libs/firebase/CreateProject";
import FullPageLoader from "../../../components/ui/FullPageLoader";
import Select from "../../../components/ui/Select";
import { useNavigate } from "react-router-dom";

const SubmitProject = () => {
  const { notifySuccess, notifyError } = useToast();
  const { currentUser, role, loading } = useAuth();
  const navigate = useNavigate();
  const { uploadFile } = useUploadFile();
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
    file: null,
  });
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser?.uid) return;

      try {
        const userRef = doc(db, "Student", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.abstract ||
      !formData.supervisor ||
      !formData.projectYear
    ) {
      notifyError("Please fill all required fields.");
      return;
    }

    if (loading) return <FullPageLoader />;

    if (!currentUser || role !== "student") {
      notifyError("You're not authenticated.");
      return;
    }

    try {
      isDraft ? setIsSavingDraft(true) : setIsSubmitting(true);

      let fileURL = null;
      if (formData.file) {
        const uploadResult = await uploadFile(formData.file, "project_files");
        if (!uploadResult.success) throw new Error("File upload failed");
        fileURL = uploadResult.url;
      }

      const department = userData?.department || "General";
      const projectId = generateProjectId(department);

      const projectPayload = {
        title: formData.title,
        abstract: formData.abstract,
        supervisor: formData.supervisor,
        projectYear: formData.projectYear,
        fileURL: fileURL,
        status: isDraft ? "draft" : "pending",
        submittedBy: userData?.studentId || currentUser.uid,
        accessLevel: "public",
      };

      const result = await createProject(
        projectPayload,
        department,
        projectId,
        userData
      );

      if (result.success) {
        notifySuccess(
          isDraft ? "Project saved as draft." : "Project submitted!"
        );
        setFormData({ title: "", abstract: "", supervisor: "", projectYear: "", file: null });
        navigate(-1,{
          replace: true
        })
      } else {
        throw new Error(result.error?.message || "Project creation failed");
      }
    } catch (err) {
      console.error(err);
      notifyError("Failed to submit project. Try again.");
    } finally {
      setIsSubmitting(false);
      setIsSavingDraft(false);
    }
  };

  return (
    <div className="space-y-4 pb-4">
      <Header to="/student/projects" title="Submit New Project" showBack />

      <form
        className="space-y-5 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] p-4 rounded-lg shadow-md w-[90%] mx-auto mb-4 md:mb-0"
        onSubmit={(e) => handleSubmit(e, false)}
        noValidate
      >
        <Input
          label="Project Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter your project title"
        />

        <TextArea
          label="Abstract"
          name="abstract"
          rows={6}
          value={formData.abstract}
          onChange={handleChange}
          required
          placeholder="Write a brief abstract"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Select
              label="Project Year"
              name="projectYear"
              value={formData.projectYear}
              onChange={handleChange}
              options={[
                { value: "", label: "-- Select Project Year --" },
                ...projectYearOptions,
              ]}
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
            Upload Project File{" "}
            <span className="text-gray-400 text-xs">(DOC, DOCX)</span>
          </label>

          <div
            className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] overflow-hidden"
            onClick={() => document.getElementById("fileInput").click()}
            role="button"
            tabIndex={0}
          >
            {!formData.file ? (
              <>
                <UploadCloud className="text-blue-500 mb-2" size={36} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click or drag & drop to upload file
                </p>
                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  accept=".doc,.docx"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            ) : (
              <div className="flex items-center justify-between w-full max-w-md bg-white dark:bg-gray-900 rounded-md p-3 shadow-sm">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate overflow-hidden">
                  {formData.file.name
                    ? formData.file.name.substring(0, 25) + "..."
                    : "No file selected"}
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
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            icon={<Save size={16} />}
            onClick={(e) => handleSubmit(e, true)}
            isLoading={isSavingDraft}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            icon={<UploadCloud size={16} />}
            isLoading={isSubmitting}
            disabled={isSavingDraft}
          >
            Submit Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitProject;
