"use client";

import React, { useTransition } from "react";
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
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialButton from "./social-button";
import Seperator from "./seperator";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

type TComponentProps = {
  changeVariant: () => void;
};

const RegisterForm: React.FC<TComponentProps> = ({ changeVariant }) => {
  const [isPending, startTransition] = useTransition();

  // creating a form using useForm hook
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(() => {
      register(values);
    });
  }
  return (
    <div className="bg-transparent w-full md:w-[28rem] px-5">
      <div className="flex flex-col justify-center items-center mb-4 space-y-1">
        <p className="text-sm text-gray-500">Register to</p>
        <p className="font-bold text-xl">Create a new account</p>
      </div>

      <div className=" border-[1px] px-5 py-5 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isPending}
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
                      type="password"
                      disabled={isPending}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message="" />
            <FormSuccess message="Email sent!!" />
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
              <p className="text-sm">Already have an account ?</p>
              <Button
                variant={"link"}
                className="p-0 text-amber-500"
                onClick={changeVariant}
              >
                Log in
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

export default RegisterForm;
