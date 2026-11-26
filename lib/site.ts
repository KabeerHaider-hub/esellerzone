// Central place for business details. Update these and every page follows.
// TODO(owner): confirm which contact details to show (Karachi vs US) and add a real phone/WhatsApp.
export const site = {
  name: "eSeller Zone",
  domain: "https://esellerzone.com",
  tagline: "Empowering businesses with the future of digital.",
  description:
    "eSeller Zone is a full-service digital and e-commerce growth agency: marketplace management, online stores, websites, apps, AI automation, SEO, paid ads and branding under one roof.",
  email: "info@esellerzone.com",
  phone: "+1 707-786-3133", // US line via Zenvyra Digital; add a Pakistan number to offices[0].phone
  whatsapp: "", // digits only, e.g. "923000000000"
  address: "Tariq Center, Office 211, Tariq Rd, P.E.C.H.S Block 2, Karachi 74500, Pakistan",
  hours: "Mon to Sat, 5 PM to 1 AM (PKT). Sunday closed.",
  // Offices: Karachi (eSeller Zone) and the US office of our partner company, Zenvyra Digital.
  offices: [
    { label: "Pakistan office", city: "Karachi", address: "Tariq Center, Office 211, Tariq Rd, P.E.C.H.S Block 2, Karachi 74500, Pakistan", phone: "" },
    { label: "US office (Zenvyra Digital)", city: "Missouri City, TX", address: "5680 Highway 6, #253, Missouri City, TX 77459, United States", phone: "+1 707-786-3133" },
  ],
  partner: {
    name: "Zenvyra Digital",
    url: "https://zenvyradigital.com/",
    blurb: "Our US partner company. Together we serve brands across the US, UK and beyond with one team and one plan.",
    address: "5680 Highway 6, #253, Missouri City, TX 77459, United States",
    phone: "+1 707-786-3133",
  },
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
