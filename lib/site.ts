// Central place for business details. Update these and every page follows.
// TODO(owner): confirm which contact details to show (Karachi vs US) and add a real phone/WhatsApp.
export const site = {
  name: "eSeller Zone",
  domain: "https://esellerzone.com",
  tagline: "Empowering businesses with the future of digital.",
  description:
    "eSeller Zone is a full-service digital and e-commerce growth agency: marketplace management, online stores, websites, apps, AI automation, SEO, paid ads and branding under one roof.",
  email: "info@esellerzone.com",
  phone: "", // e.g. "+92 300 0000000"
  whatsapp: "", // digits only, e.g. "923000000000"
  address: "Tariq Center, Office 211, Tariq Rd, P.E.C.H.S Block 2, Karachi 74500, Pakistan",
  hours: "Mon to Sat, 5 PM to 1 AM (PKT). Sunday closed.",
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
