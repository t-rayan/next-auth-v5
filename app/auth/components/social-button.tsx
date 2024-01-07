import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import React from "react";

function SocialButton() {
  return (
    <Button size={"default"} variant={"secondary"} className="w-full">
      <div className="flex items-center gap-x-2">
        <FcGoogle size="1.2rem" />
        Continue with Google
      </div>
    </Button>
  );
}

export default SocialButton;
