import React from "react";
import RegisterLayout from "../components/auth/RegisterLayout";
import RegisterHeader from "../components/auth/RegisterHeader";
import RegisterForm from "../components/auth/RegisterForm";
import RegisterFooter from "../components/auth/RegisterFooter";

function Register() {
  return (
    <>
    <RegisterLayout>
      <RegisterHeader />
      <RegisterForm />
      <RegisterFooter />
    </RegisterLayout>
    </>
  );
}

export default Register;
