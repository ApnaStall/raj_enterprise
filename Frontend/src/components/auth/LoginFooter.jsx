import { Link } from "react-router-dom";

function LoginFooter() {
  return (
    <>
    <p className="text-center mt-6 text-gray-700">
      Don’t have an account?{" "}
      <Link to="/register" className="text-[#03519F] font-semibold hover:underline">
        Register
      </Link>
    </p>
    </>
  );
}

export default LoginFooter;
