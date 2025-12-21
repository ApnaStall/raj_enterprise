import { Link } from "react-router-dom";

function RegisterFooter() {
  return (
    <>
    <p className="text-center mt-6 text-gray-700">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-[#03519F] font-semibold hover:underline"
      >
        Login
      </Link>
    </p>
    </>
  );
}

export default RegisterFooter;
