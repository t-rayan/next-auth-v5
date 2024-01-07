"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Lato } from "next/font/google";
import { useRouter } from "next/navigation";

const font = Lato({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const router = useRouter();

  const navigateToAuthPage = () => {
    router.push("/auth");
  };

  return (
    <main className="min-h-screen flex justify-center items-center align-middle">
      <div className="p-5 flex flex-col justify-center items-center">
        <h1 className={cn("font-bold text-4xl", font.className)}>
          Welcome to Tasker
        </h1>
        <div className="mt-8">
          <Button size={"lg"} onClick={navigateToAuthPage}>
            Get Started <ChevronRightIcon className="ml-2" />{" "}
          </Button>
        </div>
      </div>
    </main>
  );
}
