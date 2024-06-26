"use client";

import Loader from "@/components/global/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { FormSchema } from "@/lib/types";

const SignUpSchema = z
  .object({
    phone: z
      .string()
      .describe("Phone")
      .min(11, "Enter correct phone number")
      .max(14, "Enter correct phone number"),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Confirm Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match.",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: { phone: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({ phone, password }: z.infer<typeof FormSchema>) => {
    setConfirmation(true);
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center h-screen items-center sm:w-[400px] space-y-6 mx-auto"
      >
        <Link href="/" className="w-full flex items-center justify-center">
          <span className="font-semibold dark:text-white text-4xl ml-2">
            Shop Sphere
          </span>
        </Link>
        <FormDescription className="text-foreground/60">
          Sign up to Shop Sphere
        </FormDescription>
        {!confirmation && (
          <>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="sm:w-[400px]"
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="sm:w-[400px]"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="sm:w-[400px]"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full p-6 " disabled={isLoading}>
              {!isLoading ? "Create Account" : <Loader />}
            </Button>
          </>
        )}

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <span className="self-center">
          Already have an account?{" "}
          <Link className="text-sky-500 hover:underline" href="/login">
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default Signup;
