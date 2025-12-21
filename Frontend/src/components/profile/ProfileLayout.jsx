import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import UserDetailsCard from "./UserDetailsCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import ResetPasswordCard from "./ResetPasswordCard";
import ProfilePhotoCard from "./ProfilePhotoCard";

function ProfileLayout({ fromCheckout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) return null; // or loader

  return (
    <>
      <Navbar />

      <div className="mt-20 min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
        <div className="w-full max-w-3xl space-y-6">

          {/* ✅ PROFILE PHOTO */}
          <ProfilePhotoCard user={user} setUser={setUser} />

          <UserDetailsCard />
          <ProfileCompletionCard fromCheckout={fromCheckout} />
          <ResetPasswordCard />

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfileLayout;
