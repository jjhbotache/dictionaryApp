"use client"

import { JSX } from "react"
import { cn } from "@/utils/cn"

export type TextVariant = 
  | "h1"
  | "h2" 
  | "h3" 
  | "h4"
  | "body" 
  | "body-small" 
  | "italic" 
  | "subtitle"
  | "label"

export interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
  className?: string
  color?: "default" | "muted" | "primary" | "accent"
  as?: keyof JSX.IntrinsicElements
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  className = "",
  color = "default",
  as: Component = "p",
}) => {
  // Mapping de variantes a clases de Tailwind
  const variantClasses: Record<TextVariant, string> = {
    h1: "text-5xl md:text-5xl font-bold",
    h2: "text-xl italic",
    h3: "text-lg",
    h4: "text-base",
    body: "text-base",
    "body-small": "text-sm",
    italic: "italic",
    subtitle: "text-sm text-gray-600 dark:text-gray-400",
    label: "font-medium"
  }

  // Mapping de colores a clases de Tailwind
  const colorClasses: Record<string, string> = {
    default: "text-gray-900 dark:text-gray-100",
    muted: "text-gray-400 dark:text-gray-400",
    primary: "text-purple-500 dark:text-primary-light",
    accent: "text-purple-700 dark:text-primary-light"
  }

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  )
}
