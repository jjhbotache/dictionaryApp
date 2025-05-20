/**
 * Theme utilities for the application
 */

export type ThemeType = 'light' | 'dark' | 'system';
export type FontType = 'serif' | 'sans-serif' | 'monospace';

/**
 * Gets the theme preference based on system settings
 * @returns The system preferred theme: 'dark' or 'light'
 */
export const getSystemPreferredTheme = (): ThemeType => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * Retrieves the stored theme preference from localStorage
 * @returns The stored theme preference or system preference if not stored
 */
export const getStoredTheme = (): ThemeType => {
  if (typeof localStorage === 'undefined') return getSystemPreferredTheme();
  
  const storedTheme = localStorage.getItem('theme') as ThemeType | null;
  
  if (!storedTheme) {
    // Return the actual system preference value, not 'system'
    return getSystemPreferredTheme();
  }
  
  return storedTheme;
};

/**
 * Applies the selected theme to the document
 * @param theme - The theme to apply: 'light', 'dark', or 'system'
 */
export const applyTheme = (theme: ThemeType): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const systemPreference = getSystemPreferredTheme();
  const effectiveTheme = theme === 'system' ? systemPreference : theme;
  
  // First remove both classes to ensure clean state
  root.classList.remove('dark', 'light');
  
  // Then add the correct class
  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.add('light');
  }
  
  // Store the theme preference
  saveThemePreference(theme);
};

/**
 * Saves the theme preference to localStorage
 * @param theme - The theme preference to save
 */
export const saveThemePreference = (theme: ThemeType): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('theme', theme);
};

/**
 * Saves the font preference to localStorage
 * @param font - The font preference to save
 */
export const saveFontPreference = (font: FontType): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('font', font);
};

/**
 * Gets the stored font preference from localStorage
 * @returns The stored font preference or default if not stored
 */
export const getStoredFont = (): FontType => {
  if (typeof localStorage === 'undefined') return 'sans-serif';
  
  const storedFont = localStorage.getItem('font') as FontType | null;
  
  if (!storedFont) {
    return 'sans-serif'; // Default font
  }
  
  return storedFont;
};

/**
 * Applies the selected font to the document
 * @param font - The font family to apply
 */
export const applyFont = (font: FontType): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Remove existing font classes
  root.classList.remove('font-serif', 'font-sans', 'font-mono');
  
  // Add the new font class
  switch (font) {
    case 'serif':
      root.classList.add('font-serif');
      break;
    case 'sans-serif':
      root.classList.add('font-sans');
      break;
    case 'monospace':
      root.classList.add('font-mono');
      break;
  }
  
  // Store the font preference
  saveFontPreference(font);
};
