import React from 'react';
import { useTheme } from '../components/ThemeContext';

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  return (
    <div className="btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
        checked={theme === 'light'}
        value="light"
        onChange={handleThemeChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">Light</label>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        checked={theme === 'dark'}
        value="dark"
        onChange={handleThemeChange}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">Dark</label>
    </div>
  );
}
