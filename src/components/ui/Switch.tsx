"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/utils/cn"
import { Moon, Sun } from "lucide-react"

export interface SwitchProps {
  onChange: () => void
  className?: string
  thumbClassName?: string
}

export const Switch: React.FC<SwitchProps> = ({
  onChange,
  className = "",
  thumbClassName = ""
}) => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setIsDark(document?.documentElement?.classList?.contains('dark') || false);
  }, []);
  
  return (
    <div className="flex items-center">
      <button
        onClick={onChange}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-500 dark:bg-gray-700",
          className
        )}
      >
        <span
          className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:translate-x-6",
        !isDark && "translate-x-1",
        thumbClassName
          )}
        />
      </button>
      <div className="ml-2">
        <Moon className="dark:hidden block  " size={16} />
        <Sun className="dark:block hidden " size={16} />
      </div>
    </div>
  )
}
