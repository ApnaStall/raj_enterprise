import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

function ProfileCompletionCard({ fromCheckout }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/user/profile").then(res => {
      setUser(res.data.user);
    });
  }, []);

  if (!user || user.profileComplete) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-400 p-4 rounded-xl">
      <p className="font-medium">
        Please complete your profile to continue.
      </p>

      {fromCheckout && (
        <button
          onClick={() => navigate("/checkout")}
          className="mt-2 text-sm text-blue-600 underline"
        >
          Return to Checkout
        </button>
      )}
    </div>
  );
}

export default ProfileCompletionCard;
