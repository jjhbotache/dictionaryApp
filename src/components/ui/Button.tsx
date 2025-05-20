"use client"

import React from "react"
import { cn } from "@/utils/cn"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "icon"
export type ButtonSize = "sm" | "md" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  isFullWidth?: boolean
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isFullWidth = false,
  icon,
  ...props
}) => {
  // Mapping de variantes a clases de Tailwind
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-purple-500 hover:bg-purple-600 text-white",
    secondary: "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800",
    link: "text-purple-500 hover:underline p-0",
    icon: "rounded-full flex items-center justify-center"
  };

  // Mapping de tamaños a clases de Tailwind
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-sm py-1.5 px-3",
    md: "py-2 px-4",
    lg: "text-lg py-2.5 px-5",
    icon: "p-3"
  };
  
  return (
    <button
      className={cn(
        "rounded-full font-medium transition-all duration-75 transform flex items-center",
        "hover:scale-105 hover:shadow-lg active:shadow-inner active:scale-95 active:transform",
        "focus:scale-105 focus:shadow-lg focus:outline-none",
        "focus:bg-opacity-90",
        variantClasses[variant],
        sizeClasses[size],
        isFullWidth ? "w-full" : "",
        variant !== "link" ? "flex items-center justify-center gap-2" : "",
        className
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
}
