import React, { createContext, useCallback, useContext, useState } from "react";

export type Themes = "dark" | "light";

interface Props {
  children: React.ReactNode;
}

type ThemeContextData = {
  currentTheme: Themes;
  handleChangeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<Themes>("light");

  function handleChangeTheme() {
    if (selectedTheme === "light") {
      setSelectedTheme("dark");
      return;
    }

    if (selectedTheme === "dark") {
      setSelectedTheme("light");
      return;
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: selectedTheme,
        handleChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
