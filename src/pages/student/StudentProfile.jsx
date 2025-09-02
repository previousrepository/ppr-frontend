import useUserProfile from "../../hooks/useUserProfile";
import ProfileView from "../../components/public/ProfileView ";
import { useAuth } from "../../hooks/useAuth";
import FullPageLoader from "../../components/ui/FullPageLoader";
import Header from "../../components/ui/Header";
import { useNavigate } from "react-router-dom";
import { auth } from "../../libs/firebase/config";
import HeaderActions from "../../components/ui/HeaderActions";

const StudentProfile = () => {
  const { role } = useAuth();
  const { profile, loading } = useUserProfile();
  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Profile"
        rightContent={
          <HeaderActions
            showSearch={false}
            showFilter={false}
            showMenuButton={true}
            onLogout={() => {
              auth.signOut();
              navigate("/login");
            }}
          />
        }
      />

      {loading ? (
        <FullPageLoader />
      ) : (
        <ProfileView profile={profile} role={role} />
      )}
    </>
  );
};

export default StudentProfile;
