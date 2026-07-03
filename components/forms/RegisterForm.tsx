"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

import { COUNTRIES } from "@/constants/countries";
import { GOALS } from "@/constants/goals";

import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validators/register";

export default function RegisterForm() {
  const router = useRouter();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setLoading(true);

      await register({
        displayName: data.displayName,
        email: data.email,
        password: data.password,
        country: data.country,
        goal: data.goal,
      });

      router.push("/verify-email");
    } catch (error) {
      console.error(error);
      alert("Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-rose-50 p-6">
      <Card className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Logo />

          <h1 className="mt-6 text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join HONEYMOON and connect worldwide.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Full Name"
            error={errors.displayName?.message}
            {...formRegister("displayName")}
          />

          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...formRegister("email")}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            error={errors.password?.message}
            {...formRegister("password")}
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            error={errors.confirmPassword?.message}
            {...formRegister("confirmPassword")}
          />

          <Select
            label="Country"
            error={errors.country?.message}
            options={COUNTRIES.map((country) => ({
              value: country,
              label: country,
            }))}
            {...formRegister("country")}
          />

          <Select
            label="Goal of Joining"
            error={errors.goal?.message}
            options={GOALS.map((goal) => ({
              value: goal.value,
              label: goal.label,
            }))}
            {...formRegister("goal")}
          />

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                {...formRegister("terms")}
              />

              <label htmlFor="terms" className="text-sm">
                I agree to the Terms and Privacy Policy.
              </label>
            </div>

            {errors.terms && (
              <p className="text-sm text-red-500">
                {errors.terms.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            loading={loading}
          >
            Create Account
          </Button>
        </form>
      </Card>
    </main>
  );
}
