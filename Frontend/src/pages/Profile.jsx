import { useLocation } from "react-router-dom";
import ProfileLayout from "../components/profile/ProfileLayout";

function Profile() {
  const { state } = useLocation();

  return (
    <ProfileLayout
      fromCheckout={state?.fromCheckout}
    />
  );
}

export default Profile;
