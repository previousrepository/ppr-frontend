import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

// Public pages
import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ResetPassword from "../pages/public/ResetPassword";
import NotFound from "../pages/public/NotFound";

// Student Layout & Pages
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import Projects from "../pages/student/Projects";
import MyProject from "../pages/student/projects/MyProject";
import SubmitProject from "../pages/student/projects/SubmitProject";
import Drafts from "../pages/student/projects/Drafts";
import AccessRequestHistory from "../pages/student/projects/AccessRequestHistory";
import ViewProject from "../components/public/ViewProject";
import EditProject from "../pages/student/projects/EditProject";
import Explore from "../pages/student/Explore";
// import Profile from "../pages/student/Profile";
import StudentProfile from "../pages/student/StudentProfile";

// Lecturer Layout & Pages
import LecturerLayout from "../layouts/LecturerLayout";
import LecturerDashboard from "../pages/lecturer/LecturerDashboard";
import LecturerProjects from "../pages/lecturer/Projects";
import Submissions from "../pages/lecturer/projects/Submissions";
import LecturerExplore from "../pages/lecturer/Explore";
// import LecturerProfile from "../pages/lecturer/LecturerProfile";
import LecturerViewProject from "../pages/lecturer/projects/LecturerViewProject";
import ExploreViewProject from "../pages/lecturer/component/ExploreViewProject";
import AccessRequestsReview from "../pages/lecturer/projects/AccessRequestsReview";
import GetActivityLogs from "../pages/lecturer/projects/getActivityLogs";
import LecturerProfile from "../pages/lecturer/LecturerProfile";

//Guest Layout & Pages
import GuestLayout from "../layouts/GuestLayout";
import GuestExplore from "../pages/guest/guestExplore";
import GuestViewProject from "../pages/guest/component/GuestViewProject";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Public Routes */}
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="resetPassword" element={<ResetPassword />} />

      {/* Student Routes */}
      <Route
        path="student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/my" element={<MyProject />} />
        <Route path="projects/submit" element={<SubmitProject />} />
        <Route path="projects/drafts" element={<Drafts />} />
        <Route path="projects/requests" element={<AccessRequestHistory />} />
        <Route path="projects/edit/:id" element={<EditProject />} />
        <Route path="projects/view/:id" element={<ViewProject />} />
        <Route path="explore" element={<Explore />} />
        <Route path="explore/view/:department/:id" element={<ViewProject />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Lecturer Routes */}
      <Route
        path="lecturer"
        element={
          <ProtectedRoute allowedRoles={["lecturer"]}>
            <LecturerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<LecturerDashboard />} />
        <Route path="projects" element={<LecturerProjects />} />
        <Route path="projects/submissions" element={<Submissions />} />
        <Route
          path="projects/submissions/view/:id"
          element={<LecturerViewProject />}
        />
        <Route path="explore" element={<LecturerExplore />} />
        <Route path="explore/view/:id" element={<ExploreViewProject />} />
        <Route path="profile" element={<LecturerProfile />} />
        <Route
          path="projects/access-requests-review"
          element={<AccessRequestsReview />}
        />
        <Route
          path="projects/access-request/view/:id"
          element={<LecturerViewProject />}
        />
        <Route path="projects/activity-logs" element={<GetActivityLogs />} />
      </Route>

      {/* Guest Routes */}
      <Route path="guest" element={<GuestLayout />}>
        <Route index element={<Navigate to="explore" replace />} />
        <Route path="explore" element={<GuestExplore />} />
        <Route path="explore/view/:department/:projectId" element={<GuestViewProject />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
