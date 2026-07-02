import { SITE_CONFIG } from "./site";

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
  };
}

export function getOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/my-self-portrait.png`,
  };
}

interface WebPageInput {
  title: string;
  description: string;
  path: string;
}

export function getWebPageSchema({ title, description, path }: WebPageInput) {
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = cleanPath === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${cleanPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
  };
}

interface SoftwareAppInput {
  name: string;
  description: string;
  path: string;
}

export function getSoftwareAppSchema({ name, description, path }: SoftwareAppInput) {
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = `${SITE_CONFIG.url}${cleanPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
  };
}

interface FAQInput {
  faq: Array<{ question: string; answer: string }>;
}

export function getFaqSchema({ faq }: FAQInput) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}
