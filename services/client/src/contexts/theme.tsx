"use client";
import React, { useLayoutEffect } from "react";
import { useEvent, useLocalStorage } from "react-use";

import { isClient } from "@/utils/predicates";

import { Theme } from "../types/theme";

interface ThemeContextData {
  theme: Theme | undefined;
  autoMode: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme | undefined>>;
}

const ThemeContext = React.createContext<ThemeContextData | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

// helpers
function setThemeOnDOM(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function darkModePreference() {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

function getSystemTheme(): Omit<Theme, Theme.AUTO> {
  return darkModePreference().matches ? Theme.DARK : Theme.LIGHT;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", undefined, {
    raw: true,
  });
  const autoMode = theme === Theme.AUTO;

  // sync the theme with the system theme when in AUTO mode
  useEvent(
    "change",
    (evt) => {
      if (autoMode) setThemeOnDOM(getSystemTheme() as Theme);
    },
    isClient ? darkModePreference() : null
  );

  // sync the theme with data-theme attribute on root element
  useLayoutEffect(() => {
    if (theme) {
      const chosenTheme = autoMode ? getSystemTheme() : theme;
      setThemeOnDOM(chosenTheme as Theme);
    }
  }, [theme, autoMode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, autoMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme hook must be used within a ThemeProvider");
  }
  return context;
};
