"use client"

import React from "react"
import { cn } from "@/utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode
  variant?: "default" | "search" | "bordered"
  className?: string
  iconClassName?: string
  containerClassName?: string
}

export const Input: React.FC<InputProps> = ({
  rightIcon,
  variant = "default",
  className = "",
  iconClassName = "",
  containerClassName = "",
  ...props
}) => {
  // Mapping de variantes a clases de Tailwind
  const variantClasses: Record<string, string> = {
    default: "bg-gray-200 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500",
    search: "bg-[#F4F4F4] dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 py-3 rounded-full",
    bordered: "bg-transparent border border-gray-300 dark:border-gray-700 focus:border-purple-500"
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <input
        className={cn(
          "w-full px-4 py-2 rounded-xl transition-all focus:outline-none ",
          rightIcon ? "pr-10":"",
          variantClasses[variant],
          className
        )}
        {...props}
      />

      {rightIcon && (
        <div className={cn("absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500", iconClassName)}>
          {rightIcon}
        </div>
      )}
    </div>
  )
}
