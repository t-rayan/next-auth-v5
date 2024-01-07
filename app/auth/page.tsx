"use client";

import { useState } from "react";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";

type Variant = "LOGIN" | "REGISTER";

const AuthPage = () => {
  const [variant, setVariant] = useState<Variant>("REGISTER");

  const handleVariantChange = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      {variant === "LOGIN" ? (
        <LoginForm changeVariant={handleVariantChange} />
      ) : (
        <RegisterForm changeVariant={handleVariantChange} />
      )}
    </main>
  );
};

export default AuthPage;
