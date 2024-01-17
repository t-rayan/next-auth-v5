"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import { resetPassword } from "@/actions/reset-password";

// main component code
const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  // local state
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // creating a form using useForm hook
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    // setError("");
    // setSuccess("");

    console.log(values);
    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <div className="bg-transparent w-full md:w-[28rem] px-5">
      <div className="flex flex-col justify-center items-center mb-4 space-y-1">
        <p className="font-bold text-2xl">Reset Password</p>
      </div>

      <div className=" border-[1px] px-5 py-10 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              size={"lg"}
              className="w-full "
            >
              Send reset link
            </Button>

            {/* login signup redirect */}
            <div className="flex justify-center items-center gap-x-2 ">
              <Button variant={"link"} className="p-0 text-amber-500" asChild>
                <Link href="/auth"> Back to login</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetForm;
