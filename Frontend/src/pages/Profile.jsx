import { useLocation } from "react-router-dom";
import ProfileLayout from "../components/profile/ProfileLayout";
import { Helmet } from "react-helmet-async";

function Profile() {
  const { state } = useLocation();

  return (
    <>
      <Helmet>
        <title>Profile | Raj Enterprise</title>
      </Helmet>
      <div>
        <ProfileLayout fromCheckout={state?.fromCheckout} />
      </div>
    </>
  );
}

export default Profile;
