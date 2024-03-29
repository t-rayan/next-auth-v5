"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialButton from "./social-button";
import Seperator from "./seperator";
import { login } from "@/actions/login";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type TComponentProps = {
  changeVariant: () => void;
};

// main component code
const LoginForm: React.FC<TComponentProps> = ({ changeVariant }) => {
  const [isPending, startTransition] = useTransition();

  // getting search params from url
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already is used with another provider."
      : "";

  // local state
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // creating a form using useForm hook
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <div className="bg-transparent w-full md:w-[28rem] px-5">
      <div className="flex flex-col justify-center items-center mb-4 space-y-1">
        <p className="text-sm text-gray-500">Log in to</p>
        <p className="font-bold text-2xl">Tasker</p>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} asChild className="px-1 py-0" variant={"link"}>
              <Link href={"/auth/password-reset"}> Forgot password ?</Link>
            </Button>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
              size={"lg"}
              className="w-full "
            >
              Submit
            </Button>

            {/* login signup redirect */}
            <div className="flex justify-center items-center gap-x-2 ">
              <p className="text-sm">Don`t have an account ?</p>
              <Button
                variant={"link"}
                className="p-0 text-amber-500"
                onClick={changeVariant}
              >
                Sign up
              </Button>
            </div>

            {/* seperator */}
            <Seperator />

            {/* social auth button */}
            <SocialButton />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
