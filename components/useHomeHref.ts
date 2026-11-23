"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Visitors who are previewing Option 1 (/v1/) stay on it when they click Home or the logo.
// Everyone else goes to the main home page.
const KEY = "ez-home";

export function useHomeHref() {
  const path = usePathname() ?? "/";
  const [home, setHome] = useState(path.startsWith("/v1") ? "/v1/" : "/");
  useEffect(() => {
    try {
      if (path.startsWith("/v1")) sessionStorage.setItem(KEY, "/v1/");
      else if (path === "/" || path.startsWith("/v2")) sessionStorage.setItem(KEY, "/");
      setHome(sessionStorage.getItem(KEY) || "/");
    } catch {
      setHome(path.startsWith("/v1") ? "/v1/" : "/");
    }
  }, [path]);
  return home;
}
