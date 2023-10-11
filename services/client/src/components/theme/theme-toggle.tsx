"use client";
import React from "react";

import { useTheme } from "@/contexts/theme";
import { Theme } from "@/types/theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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

  const themeRadioButtons = [Theme.LIGHT, Theme.DARK, Theme.AUTO].map(
    (theme) => <ThemeRadioButton key={theme} theme={theme} />
  );
  return <div className="join">{themeRadioButtons}</div>;
};

export default ThemeToggle;
