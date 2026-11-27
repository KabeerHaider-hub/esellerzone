// Central place for business details. Update these and every page follows.
export const site = {
  name: "eSeller Zone",
  domain: "https://esellerzone.com",
  tagline: "Empowering businesses with the future of digital.",
  description:
    "eSeller Zone is a full-service digital and e-commerce growth agency: marketplace management, online stores, websites, apps, AI automation, SEO, paid ads and branding under one roof.",
  email: "info@esellerzone.com",
  phone: "+1 707-786-3133", // US line via Zenvyra Digital; Karachi number is offices[0].phone
  whatsapp: "", // digits only, e.g. "923000000000"
  address: "Tariq Center, Office 211, Tariq Rd, P.E.C.H.S Block 2, Karachi 74500, Pakistan",
  hours: "Mon to Sat, 5 PM to 1 AM (PKT). Sunday closed.",
  // Offices: Karachi (eSeller Zone) and the US office of our partner company, Zenvyra Digital.
  offices: [
    {
      id: "karachi",
      label: "Pakistan office",
      city: "Karachi",
      address: "Tariq Center, Office 211, Tariq Rd, P.E.C.H.S Block 2, Karachi 74500, Pakistan",
      phone: "+92 333 3128078",
      // Structured address for Google (schema.org). Keep it identical to Google Business Profile and directory listings.
      street: "Tariq Center, Office 211, Tariq Rd, P.E.C.H.S Block 2",
      locality: "Karachi",
      region: "Sindh",
      postalCode: "74500",
      country: "PK",
    },
    {
      id: "us",
      label: "US office",
      city: "Missouri City, TX",
      address: "5680 Highway 6, #253, Missouri City, TX 77459, United States",
      phone: "+1 707-786-3133",
      street: "5680 Highway 6, #253",
      locality: "Missouri City",
      region: "TX",
      postalCode: "77459",
      country: "US",
    },
  ],
  partner: {
    name: "Zenvyra Digital",
    url: "https://zenvyradigital.com/",
    blurb: "Our US partner company. Together we serve brands across the US, UK and beyond with one team and one plan.",
    address: "5680 Highway 6, #253, Missouri City, TX 77459, United States",
    phone: "+1 707-786-3133",
  },
  // Opening hours in schema.org form (PKT). Closing after midnight is fine: Google reads 17:00-01:00 as overnight.
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "17:00", closes: "01:00" },
  // Countries we serve (ISO codes), used in structured data.
  areaServed: ["US", "GB", "CA", "AU", "AE", "PK"],
  // Add every official profile here (LinkedIn, YouTube, TikTok, Clutch, etc.). They feed the footer and Google's sameAs.
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/ESellerZone" },
    { label: "Instagram", href: "https://www.instagram.com/esellerzone/" },
  ],
  // Optional: set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) to receive form posts.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];
