"use client"

import React from "react"
import { cn } from "../../utils/cn"

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outlined" | "elevated"
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default"
}) => {
  // Mapping de variantes a clases de Tailwind
  const variantClasses: Record<string, string> = {
    default: "bg-white dark:bg-gray-800",
    outlined: "border border-gray-300 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-md"
  }

  return (
    <div
      className={cn(
        "rounded-lg p-4",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => {
  return <div className={className}>{children}</div>
}

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => {
  return <div className={cn("mt-4 pt-4 border-t border-gray-200 dark:border-gray-700", className)}>{children}</div>
}
