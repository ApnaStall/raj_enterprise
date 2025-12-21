import { FaStethoscope } from "react-icons/fa";

function LoginHeader() {
  return (
    <>
      <div className="flex justify-center mb-5">
        <FaStethoscope size={60} className="text-[#03519F]" />
      </div>

      <h2 className="text-4xl font-bold text-center mb-6 text-[#03519F]">
        Welcome Back
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Login to access high-quality medical garments and hospital supplies.
      </p>
    </>
  );
}

export default LoginHeader;
