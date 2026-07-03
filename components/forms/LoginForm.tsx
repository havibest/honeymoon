"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";

import { useAuth } from "@/contexts/AuthContext";

import {
  loginSchema,
  LoginFormData,
} from "@/lib/validators/login";

import { getFirebaseErrorMessage } from "@/utils/firebase-errors";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      setLoading(true);

      await login(data.email, data.password);

      router.push("/dashboard");

    } catch (error: any) {
      alert(
        getFirebaseErrorMessage(error.code)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Layout UI elements will go here */}
      <h1>Login Placeholder</h1>
    </div>
  );
}
