import type { IconName } from "@/lib/services";

const paths: Record<IconName | "arrow" | "check" | "mail" | "pin" | "clock" | "chat" | "spark", string> = {
  store: "M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6",
  cart: "M3 4h2l2.4 11.2a1 1 0 001 .8h9.7a1 1 0 001-.8L21 8H6.2M9 20.5a.5.5 0 110-1 .5.5 0 010 1zm9 0a.5.5 0 110-1 .5.5 0 010 1z",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  phone: "M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  cpu: "M7 7h10v10H7zM10 10h4v4h-4zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4",
  bot: "M12 3v3M6 8h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2zM9 13h.01M15 13h.01M9.5 16.5h5",
  pen: "M4 20l4-1 11-11a2.1 2.1 0 00-3-3L5 16l-1 4zM14 6l3 3",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  megaphone: "M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a3 3 0 010 6M18 6a7 7 0 010 12",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 12h.01",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zM4 19a2 2 0 012-2h13M8 7h7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  chat: "M4 5h16v11H8l-4 4V5z",
  spark: "M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z",
};

export type AnyIcon = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5" }: { name: AnyIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
