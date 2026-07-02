import ToolShell from "../../../components/ToolShell";
import ApiSurfaceMapClient from "../../../components/ApiSurfaceMapClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "API Surface Mapper",
  description: "Paste curl commands or a raw HTTP request and get a clean endpoint map with methods, hosts, and query params. Tokens and auth headers are redacted before they reach the map. Runs in your browser.",
  path: "/tools/api-surface-map",
});

export default function ApiSurfaceMapPage() {
  return (
    <ToolShell
      eyebrow="APIs & Traffic"
      title="API Surface Mapper"
      intro="Paste curl commands or a raw HTTP trace. It maps every request into a tidy surface of methods, hosts, and paths, and pulls tokens, auth headers, and secret query params out of the way first. Nothing is uploaded."
      accent="var(--accent-blue)"
      pack="tesserakit-api"
      packBlurb="The full api pack parses curl and HTTP traces into a validated, secret-redacted API surface map."
    >
      <ApiSurfaceMapClient />
    </ToolShell>
  );
}
