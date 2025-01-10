"use client";

import { authPostSignupAction } from "@/app/actions/auth-post-signup.action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({ message: "Must be a valid email" }),
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type IClientSignupFormProps = {};

const ClientSignupForm: React.FC<IClientSignupFormProps> = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (input: z.infer<typeof formSchema>) => {
    try {
      // todo fix dirty redirect and manual user type assignment
      await authPostSignupAction({
        email: input.email,
        name: input.name,
        password: input.password,
        userType: "clients",
        loginType: "manual",
      });
      router.push("/clients");
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Something went wrong",
        description: "The team has been notified. Please try again later.",
        type: "error",
      });
    }
  };

  const {
    formState: { errors },
    formState: { isValid },
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-4"
    >
      <Field
        label="Email"
        invalid={errors.email?.message !== undefined}
        errorText={errors.email?.message}
      >
        <Input
          placeholder="Email"
          {...form.register("email")}
        />
      </Field>
      <Field
        label="Full Name"
        invalid={errors.name?.message !== undefined}
        errorText={errors.name?.message}
      >
        <Input
          placeholder="Name"
          {...form.register("name")}
        />
      </Field>
      <Field
        label="Password"
        invalid={errors.password?.message !== undefined}
        errorText={errors.password?.message}
      >
        <Input
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
      </Field>

      <Field
        label="Confirm Password"
        invalid={errors.confirmPassword?.message !== undefined}
        errorText={errors.confirmPassword?.message}
      >
        <Input
          type="password"
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
        />
      </Field>
      <Button
        variant={"surface"}
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full"
      >
        Submit
      </Button>
    </form>
  );
};

ClientSignupForm.displayName = "ClientSignupForm";

export default ClientSignupForm;
