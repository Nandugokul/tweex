"use client";
import LoginSection from "@/components/loginSignUp/LoginSection";
import SignUpSection from "@/components/loginSignUp/SignUpSection";
import { useEffect, useState } from "react";
import userDetails from "@/data/userDummyData";

const DynamicSection = () => {
  useEffect(() => {
    userDetails.forEach((item) => {
      localStorage.setItem("users", JSON.stringify(item));
    });
  }, []);

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
