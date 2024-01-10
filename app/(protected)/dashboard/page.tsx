import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant={"destructive"} type="submit">
          Signout
        </Button>
      </form>
    </div>
  );
};

export default DashboardPage;
