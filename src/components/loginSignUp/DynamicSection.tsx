"use client";
import LoginSection from "@/components/loginSignUp/LoginSection";
import SignUpSection from "@/components/loginSignUp/SignUpSection";
import { useState } from "react";

const DynamicSection = () => {
  const [showLogin, setShowLogin] = useState(true);
  const handleShowLogin = (signInORSignUpData: boolean) => {
    console.log(signInORSignUpData);
    setShowLogin(signInORSignUpData);
  };
  return (
    <>
      {showLogin ? (
        <LoginSection signInORSignUp={handleShowLogin} />
      ) : (
        <SignUpSection signInORSignUp={handleShowLogin} />
      )}
    </>
  );
};

export default DynamicSection;
