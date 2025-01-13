"use client";

import { postAuthSigninAction } from "@/app/actions/auth/post-auth-post-signin-action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const ClientSigninForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (input: z.infer<typeof formSchema>) => {
    const result = await postAuthSigninAction(input.email, input.password);

    if (result.error) {
      toaster.create({
        description: result.error,
        type: "info",
      });
      form.setValue("password", "");
    } else if (result.data) {
      router.push("/clients");
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

ClientSigninForm.displayName = "ClientSigninForm";

export default ClientSigninForm;
