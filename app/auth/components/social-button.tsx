import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import React from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
function SocialButton() {
  const handleGoogleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button
      size={"default"}
      variant={"secondary"}
      className="w-full"
      onClick={handleGoogleSignIn}
    >
      <div className="flex items-center gap-x-2">
        <FcGoogle size="1.2rem" />
        Continue with Google
      </div>
    </Button>
  );
}

export default SocialButton;
