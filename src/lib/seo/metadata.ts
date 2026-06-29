import { Metadata } from "next";
import { SITE_CONFIG } from "./site";

interface MetadataInput {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noindex?: boolean;
  ogType?: "website" | "article";
}

export function constructMetadata({
  title,
  description,
  image,
  path = "",
  noindex = false,
  ogType = "website",
}: MetadataInput = {}): Metadata {
  const metaTitle = title ? `${title} | Sans Serif Systems` : SITE_CONFIG.defaultTitle;
  const metaDesc = description || SITE_CONFIG.defaultDescription;
  const metaImage = image 
    ? (image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`) 
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`;
  
  // Ensure paths start and end cleanly with trailing slashes to preserve Astro format
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = cleanPath === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${cleanPath}`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noindex,
      follow: true,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: metaImage,
        },
      ],
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
    authors: [{ name: SITE_CONFIG.author }],
  };
}
