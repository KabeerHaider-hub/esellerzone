import { HomePage } from "@/components/HomePage";

// NEXT_PUBLIC_HOME_VARIANT=cosmic makes Option 2 (planet behind the whole page) the main home page.
// Leave it unset for Option 1. Option 2 is also always available at /v2/.
const variant = process.env.NEXT_PUBLIC_HOME_VARIANT === "cosmic" ? "cosmic" : "classic";

export default function Home() {
  return <HomePage variant={variant} />;
}
