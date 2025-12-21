import { useState } from "react";
import api from "../../utils/axios";
import AvatarCropModal from "./AvatarCropModal";
import { getCroppedImage } from "../../utils/cropImage";
import { FaUserCircle, FaTrash } from "react-icons/fa";

/* Helper: get initials */
const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

function ProfilePhotoCard({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  /* 📸 Select image → open crop modal */
  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setShowCrop(true);
  };

  /* ✂️ Crop done → upload cropped image */
  const handleCropDone = async (cropPixels) => {
    try {
      setLoading(true);

      const croppedBlob = await getCroppedImage(
        selectedImage,
        cropPixels
      );

      const formData = new FormData();
      formData.append("photo", croppedBlob);

      const res = await api.post(
        "/api/user/profile-photo",
        formData
      );

      const updatedUser = {
        ...user,
        profilePhoto: res.data.profilePhoto
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      // 🔔 Update navbar avatar instantly
      window.dispatchEvent(new Event("auth-change"));

    } catch (err) {
      alert("Failed to upload photo");
    } finally {
      setLoading(false);
      setShowCrop(false);
      setSelectedImage(null);
    }
  };

  /* 🗑 Remove photo → fallback to initials/icon */
  const handleRemove = async () => {
    try {
      setLoading(true);

      await api.delete("/api/user/profile-photo");

      const updatedUser = {
        ...user,
        profilePhoto: ""
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      window.dispatchEvent(new Event("auth-change"));
    } catch (err) {
      alert("Failed to remove photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-6">

        {/* AVATAR */}
        {user?.profilePhoto ? (
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : user?.name ? (
          <div
            className="w-20 h-20 rounded-full bg-[#03519F]
                       text-white flex items-center justify-center
                       text-2xl font-bold"
          >
            {getInitials(user.name)}
          </div>
        ) : (
          <FaUserCircle size={80} className="text-gray-400" />
        )}

        {/* ACTIONS */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">
            {user?.name || "User"}
          </p>

          <div className="flex gap-3">
            {/* CHANGE PHOTO */}
            <label className="cursor-pointer text-sm font-semibold text-[#03519F]">
              {loading ? "Processing..." : "Change Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
                hidden
                disabled={loading}
              />
            </label>

            {/* REMOVE PHOTO */}
            {user?.profilePhoto && (
              <button
                onClick={handleRemove}
                disabled={loading}
                className="flex items-center gap-1 text-sm text-red-600
                           hover:text-red-700 font-semibold"
              >
                <FaTrash size={12} /> Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CROP MODAL */}
      {showCrop && (
        <AvatarCropModal
          image={selectedImage}
          onCancel={() => {
            setShowCrop(false);
            setSelectedImage(null);
          }}
          onCropDone={handleCropDone}
        />
      )}
    </>
  );
}

export default ProfilePhotoCard;
