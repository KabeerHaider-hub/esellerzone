import Script from "next/script";
import { site } from "@/lib/site";
import { isPreviewBuild } from "@/lib/seo";

// Google Analytics 4. Uses site.gaMeasurementId unless NEXT_PUBLIC_GA_ID overrides it.
// Preview builds load nothing, so test traffic stays out of the reports.
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID || site.gaMeasurementId;
  if (!id || isPreviewBuild) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
