"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [pending, setTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!token) {
      setError("Missing Token");
      return;
    }
    setTransition(() => {
      newVerification(token).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Button onClick={onSubmit} disabled={pending}>
        {pending ? <BeatLoader /> : "Verify Email"}
      </Button>

      <FormSuccess message={success} />
      <FormError message={error} />

      <Button variant={"link"} asChild>
        <Link href={"/auth"}>Back to login</Link>
      </Button>
    </div>
  );
};

export default NewVerificationForm;
