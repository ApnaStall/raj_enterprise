import React from "react";
import LoginLayout from "../components/auth/LoginLayout";
import LoginHeader from "../components/auth/LoginHeader";
import LoginForm from "../components/auth/LoginForm.jsx";
import LoginFooter from "../components/auth/LoginFooter";

function Login() {
  return (
    <>
    <LoginLayout>
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </LoginLayout>
    </>
  );
}

export default Login;
