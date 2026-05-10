import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";
import axios from "axios";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const buttonVariants = {
  primary: "bg-[#234b33] text-white hover:opacity-90",
  secondary: "bg-[#d97757] text-white hover:opacity-90",
  outline:
    "border border-[#d97757] text-[#d97757] bg-transparent hover:bg-[#d97757] hover:text-white",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  fullWidth,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-all
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {leftIcon}
      {loading ? "Please wait..." : children}
      {rightIcon}
    </button>
  );
}