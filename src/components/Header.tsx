"use client"

import React, { useState } from "react"
import { Book, ChevronDown } from "lucide-react"
import { Switch } from "./ui/Switch"
import { Dropdown } from "./ui/Dropdown"
import { Button } from "./ui/Button"
import SearchHistory from "./SearchHistory"

interface HeaderProps {
  currentFont: string
  onToggleDarkMode: () => void
  onChangeFont: (font: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  currentFont,
  onToggleDarkMode,
  onChangeFont
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const fontOptions = [
    { label: "Serif", value: "serif" },
    { label: "Sans", value: "sans" },
    { label: "Mono", value: "mono" }
  ]
  
  return (
    <header className="flex justify-between items-center mb-8">
      <SearchHistory 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen}
        triggerButton={
          <Button variant="ghost" size="icon">
            <Book className="stroke-1" size={30} />
          </Button>
        }
      />

      <div className="flex items-center gap-4">
        {/* Font selector */}
        <Dropdown
          options={fontOptions}
          value={currentFont}
          onChange={onChangeFont}
          icon={<ChevronDown className="w-4 h-4" />}
        />

        {/* Vertical divider */}
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Dark mode toggle */}
        <Switch onChange={onToggleDarkMode} />
      </div>
    </header>
  )
}
