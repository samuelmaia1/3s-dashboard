'use client';

import { darkTheme, lightTheme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";

    const stored = localStorage.getItem("theme-mode");
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";
  });

    useEffect(() => {
        localStorage.setItem("theme-mode", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev: ThemeMode) => (prev === "light" ? "dark" : "light"));
    };

    const value = useMemo(
        () => ({ theme, toggleTheme }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}