"use client";
import React from "react";

import { useTheme } from "@/contexts/theme";

import { Theme } from "../types/theme";

const ThemeToggle = () => {
  const { theme, setTheme, autoMode } = useTheme();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setTheme(e.currentTarget.value as Theme);
    }
  }

  function ThemeRadioButton(props: { theme: Theme }) {
    return (
      <input
        className="join-item btn"
        type="radio"
        value={props.theme}
        aria-label={props.theme}
        checked={theme === props.theme}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="join">
      <ThemeRadioButton theme={Theme.LIGHT} />
      <ThemeRadioButton theme={Theme.DARK} />
      <ThemeRadioButton theme={Theme.AUTO} />
    </div>
  );
};

export default ThemeToggle;
