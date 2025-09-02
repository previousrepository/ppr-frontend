import {
  User,
  Mail,
  // BookOpen,
  GraduationCap,
  Briefcase,
  // Award,
  Layers,
  // FileText,
} from "lucide-react";
// import Header from "../ui/Header";
import AvatarSVG from "../ui/AvatarSVG";

const ProfileView = ({ profile, role }) => {
  if (!profile) return <p>No profile data available</p>;

    const displayRole =
    role === "student"
      ? "student"
      : role === "lecturer" && profile.staffType === "non-academic"
      ? "staff"
      : "lecturer";

  return (
    <>
      <main className="flex justify-center px-4 mt-8 ">
        <div className="w-full md:max-w-3xl space-y-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 md:p-8 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] transition-all capitalize">
          <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-2 py-4 rounded-xl shadow-sm">
            {/* <img
              src={profile.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow"
            /> */}
            <AvatarSVG name={profile?.displayName || "User"} size={75} />
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {profile.fullName}
              </h2>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs md:text-md">
                <Mail className="w-4 h-4 text-blue-500" />
                {profile.email}
              </p>
              <p className="mt-1 inline-block px-3 py-1 text-xs rounded-full font-semibold capitalize shadow-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {displayRole}
              </p>
            </div>
          </div>

          {/* <div className="flex items-start gap-2 bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-4 rounded-xl shadow-sm">
            <FileText className="text-fuchsia-500 w-5 h-5 mt-1" />
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                About
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {profile.bio || "No bio added yet."}
              </p>
            </div>
          </div> */}

          <div className="flex flex-col gap-3 bg-white/60 dark:bg-gray-700/20 backdrop-blur-sm px-3 py-4 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
              Details
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {role === "student" ? (
                <>
                  <li className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-500" />
                    <span>Matric No: {profile.admissionNumber || "-"}</span>
                  </li>
                  {/* <li className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Level: {profile.level || "-"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-pink-500" />
                    <span>Program: {profile.program || "-"}</span>
                  </li> */}
                  <li className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    <span>Faculty: {profile.faculty || "-"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-green-500" />
                    <span>Department: {profile.department || "-"}</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <span>Staff Role: {profile.staffType || "-"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    <span>Faculty: {profile.faculty || "-"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-green-500" />
                    <span>Department: {profile.department || "-"}</span>
                  </li>
                  {/* <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Rank: {profile.faculty || "-"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span>Specialization: {profile.specialization || "-"}</span>
                  </li> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileView;
