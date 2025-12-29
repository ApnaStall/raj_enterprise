import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotFoundContent() {
  const navigate = useNavigate();

  return (
    <>
        <div
        className="min-h-screen flex flex-col items-center
                    justify-center bg-gray-100 px-4 text-center"
        >
        <FaExclamationTriangle
            size={80}
            className="text-[#03519F] mb-6"
        />

        <h1 className="text-5xl font-bold text-[#03519F] mb-4">
            404
        </h1>

        <h2 className="text-2xl font-semibold mb-2">
            Page Not Found
        </h2>

        <p className="text-gray-600 max-w-md mb-6">
            Sorry, the page you are looking for doesn’t exist
            or may have been moved.
        </p>

        <button
            onClick={() => navigate("/")}
            className="bg-[#03519F] text-white px-6 py-3
                    rounded-lg font-semibold hover:bg-[#023d78]
                    transition"
        >
            Go Back Home
        </button>
        </div>
    </>
  );
}
