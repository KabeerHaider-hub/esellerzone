"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Visitors who enter through Option 2 (/v2/) stay on Option 2 when they click Home or the logo.
const KEY = "ez-home";

export function useHomeHref() {
  const path = usePathname() ?? "/";
  const [home, setHome] = useState(path.startsWith("/v2") ? "/v2/" : "/");
  useEffect(() => {
    try {
      if (path.startsWith("/v2")) sessionStorage.setItem(KEY, "/v2/");
      else if (path === "/") sessionStorage.setItem(KEY, "/");
      setHome(sessionStorage.getItem(KEY) || "/");
    } catch {
      setHome(path.startsWith("/v2") ? "/v2/" : "/");
    }
  }, [path]);
  return home;
}
