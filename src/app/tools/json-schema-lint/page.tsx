import ToolShell from "../../../components/ToolShell";
import JsonSchemaLintClient from "../../../components/JsonSchemaLintClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "JSON Schema Lint",
  description: "Lint a JSON Schema for required-not-in-properties, open objects, arrays without items, and untyped properties. Runs in your browser.",
  path: "/tools/json-schema-lint",
});

export default function JsonSchemaLintPage() {
  return (
    <ToolShell
      eyebrow="Specs & Data"
      title="JSON Schema Lint"
      intro="Paste a JSON Schema. It flags required keys that are never defined, objects left open to unexpected keys, arrays with no items schema, and properties with no type at all. Nothing is uploaded."
      accent="var(--accent-blue)"
      pack="tesserakit-schema"
      packBlurb="The full schema pack catalogs and lints every schema document in a project."
    >
      <JsonSchemaLintClient />
    </ToolShell>
  );
}
