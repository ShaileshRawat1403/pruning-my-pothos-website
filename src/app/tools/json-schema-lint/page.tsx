import { redirect } from "next/navigation";

// Retired: JSON Schema Lint overlapped too closely with ajv's structural
// validation to earn its own card. Redirects rather than 404s in case
// anyone bookmarked it.
export default function JsonSchemaLintPage() {
  redirect("/tools");
}
