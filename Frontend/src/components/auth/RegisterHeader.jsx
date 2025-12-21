import { FaUserNurse } from "react-icons/fa";

function RegisterHeader() {
  return (
    <>
      <div className="flex justify-center mb-5">
        <FaUserNurse size={60} className="text-[#03519F]" />
      </div>

      <h2 className="text-4xl font-bold text-center mb-6 text-[#03519F]">
        Create Your Account
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Join us to access medical garments, hospital uniforms & supplies.
      </p>
    </>
  );
}

export default RegisterHeader;
