import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import AvatarSVG from "./AvatarSVG";
import UseLecturerData from "../../hooks/useLecturerData";
import UseStudentData from "../../hooks/useStudentData";

const Header = ({ showBack = false, title, rightContent, children }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { userData: lecturerData } = UseLecturerData(currentUser?.uid);
  const { userData: studentData } = UseStudentData(currentUser?.uid);
  
  const userRole = lecturerData?.role || studentData?.role || null;
  const userData = userRole === "lecturer" ? lecturerData : studentData;

  const handleGoBack = () => navigate(-1);
  const isDashboard = title?.toLowerCase() === "dashboard";
  const safeTitle = title || "Page";

  return (
    <div
      role="banner"
      aria-label="Page header"
      className="sticky top-0 z-30 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] shadow border-b border-gray-700 px-4 flex items-center justify-between h-16 md:h-20 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-surface)] dark:supports-[backdrop-filter]:bg-[var(--color-dark-surface)]"
    >
      <div className="flex items-center gap-3">
        {isDashboard ? (
          <>
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <AvatarSVG name={userData?.displayName || "User"} size={40} />
            )}
            <div>
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-100">
                Welcome back, {userData?.displayName || "User"} 👋
              </h2>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                {userRole === "lecturer"
                  ? "Manage project reviews and approvals"
                  : "Here’s your personalized activity summary."}
              </p>
            </div>
          </>
        ) : (
          <>
            {showBack && (
              <button
                onClick={handleGoBack}
                className="hidden group md:inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100/50 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </button>
            )}
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-100">
              {safeTitle}
            </h2>
          </>
        )}
      </div>

      {rightContent ? (
        <div className="mt-2 sm:mt-0">{rightContent}</div>
      ) : (
        children && <div className="mt-2 sm:mt-0">{children}</div>
      )}
    </div>
  );
};

export default Header;
