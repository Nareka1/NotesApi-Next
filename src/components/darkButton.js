"use client";
import { useState, useEffect } from "react";

export function DarkToogle(props) {
  const [darkmode, setdarkmode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setdarkmode(true);
    }
  }, []);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);
  return (
    <div title={darkmode ? "light" : "dark"}>
      <h1></h1>
      <button
        className=" dark:bg-neutral-100 dark:text-sky-600 bg-black text-white p-3 w-full"
        onClick={() => {
          setdarkmode(!darkmode);
        }}
      >
        {darkmode ? "light" : "dark"}
      </button>
    </div>
  );
}
