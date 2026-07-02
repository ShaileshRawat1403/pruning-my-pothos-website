import ToolShell from "../../../components/ToolShell";
import OpenApiLintClient from "../../../components/OpenApiLintClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "OpenAPI Linter",
  description: "Paste an OpenAPI or Swagger spec and get an endpoint catalog plus hygiene findings: missing operationIds, duplicate operationIds, undocumented operations, and missing success responses. Runs in your browser.",
  path: "/tools/openapi-lint",
});

export default function OpenApiLintPage() {
  return (
    <ToolShell
      eyebrow="APIs & Contracts"
      title="OpenAPI Linter"
      intro="Paste an OpenAPI or Swagger document as JSON. It catalogs every operation and flags the gaps that trip up generated clients and reviewers: missing or duplicate operationIds, undocumented endpoints, and operations with no success response. Nothing is uploaded."
      accent="var(--accent-purple)"
      pack="tesserakit-openapi"
      packBlurb="The full openapi pack lints a spec into an endpoint catalog and a set of findings."
    >
      <OpenApiLintClient />
    </ToolShell>
  );
}
