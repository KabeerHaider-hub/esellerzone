import Link from "next/link";
import { PageHero } from "@/components/Sections";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title={<>This page drifted <span className="text-gradient">out of orbit.</span></>} text="The page you're looking for doesn't exist or has moved.">
      <Link href="/" className="btn-primary mt-10">Back to home</Link>
    </PageHero>
  );
}
