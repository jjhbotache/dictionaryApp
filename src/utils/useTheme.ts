"use client"

import { useState, useEffect } from "react"
import {  applyTheme, ThemeType,applyFont, FontType } from "./themeUtils"

export type FontOption = "serif" | "sans" | "mono"

export function useTheme() {
  // Initialize state with values from sessionStorage or default values
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [currentFont, setCurrentFont] = useState<FontOption>("serif" as FontOption)

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    // Save to sessionStorage and apply to document
    const themeValue: ThemeType = newDarkMode ? 'dark' : 'light'
    sessionStorage.setItem('theme', themeValue)
    applyTheme(themeValue)
  }

  // Handle font change
  const changeFont = (font: string) => {
    const fontValue = font as FontOption
    setCurrentFont(fontValue)
    
    // Map our FontOption to themeUtils FontType
    const fontType: FontType = fontValue === 'sans' ? 'sans-serif' : 
                              fontValue === 'mono' ? 'monospace' : 'serif'
    
    // Save to sessionStorage and apply to document
    sessionStorage.setItem('font', fontType)
    applyFont(fontType)
  }
  // Font options mapping
  const fonts = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono",
  }

  // Get font class
  const getFontClass = () => fonts[currentFont]

  // Initialize theme and font from sessionStorage on component mount
  useEffect(() => {
    // Get theme from sessionStorage or system preference
    const storedTheme = sessionStorage.getItem('theme') as ThemeType || 
                       (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')
    
    // Set initial dark mode state
    const isDark = storedTheme === 'dark'
    setDarkMode(isDark)
    
    // Apply theme to document
    applyTheme(storedTheme)
    
    // Get font from sessionStorage or use default
    const storedFontType = sessionStorage.getItem('font') as FontType || 'sans-serif'
    
    // Map themeUtils FontType back to our FontOption
    let fontOption: FontOption
    if (storedFontType === 'sans-serif') fontOption = 'sans'
    else if (storedFontType === 'monospace') fontOption = 'mono'
    else fontOption = 'serif'
    
    setCurrentFont(fontOption)
    applyFont(storedFontType)
    
  }, [])

  return {
    darkMode,
    currentFont,
    toggleDarkMode,
    changeFont,
    getFontClass
  }
}
