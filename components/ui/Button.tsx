import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  className,
  loading = false,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-rose-600 text-white hover:bg-rose-700",

    secondary:
      "bg-pink-100 text-pink-700 hover:bg-pink-200",

    outline:
      "border border-rose-600 text-rose-600 hover:bg-rose-50",
  };

  return (
    <button
      className={cn(
        "w-full rounded-xl px-4 py-3 font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}