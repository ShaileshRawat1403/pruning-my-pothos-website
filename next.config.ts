import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default withContentCollections(nextConfig);
