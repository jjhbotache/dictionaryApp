"use client"

import React from "react"
import { cn } from "@/utils/cn"

export type BadgeVariant = "default" | "primary" | "secondary" | "outline"

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = ""
}) => {
  // Mapping de variantes a clases de Tailwind
  const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    primary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    outline: "bg-transparent border border-purple-500 text-purple-500"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
