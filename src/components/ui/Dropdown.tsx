"use client"

import React, { useState } from "react"
import { cn } from "../../utils/cn"

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  className?: string
  optionsClassName?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  icon,
  className = "",
  optionsClassName = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSelect = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }
  
  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative">
      <button
        className={cn(
          "flex items-center gap-1 px-2 py-1",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label}
        {icon}
      </button>
      {isOpen && (
        <div 
          className={cn(
            "absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-10",
            optionsClassName
          )}
        >
          <ul>
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
