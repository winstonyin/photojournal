'use client'

import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <DarkModeSwitch
      style={{  }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={24}
    />
  );
}