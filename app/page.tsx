import { HomePage } from "@/components/HomePage";

// Main home page: the 3D planet stays behind the whole page (Option 2).
// Set NEXT_PUBLIC_HOME_VARIANT=classic to switch back to Option 1. Option 1 also lives at /v1/.
const variant = process.env.NEXT_PUBLIC_HOME_VARIANT === "classic" ? "classic" : "cosmic";

export default function Home() {
  return <HomePage variant={variant} />;
}
