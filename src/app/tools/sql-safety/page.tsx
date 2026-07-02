import ToolShell from "../../../components/ToolShell";
import SqlSafetyClient from "../../../components/SqlSafetyClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "SQL Migration Safety",
  description: "Lint SQL and migrations for dangerous statements: DELETE or UPDATE without WHERE, DROP without IF EXISTS, NOT NULL columns without a default, SELECT *. Runs in your browser.",
  path: "/tools/sql-safety",
});

export default function SqlSafetyPage() {
  return (
    <ToolShell
      eyebrow="Data & Migrations"
      title="SQL Migration Safety"
      intro="Paste SQL or a migration. It flags the statements that quietly wreck production: DELETE or UPDATE without a WHERE, DROP without IF EXISTS, a NOT NULL column with no default, and SELECT *. Nothing is uploaded."
      accent="var(--accent-amber)"
      pack="tesserakit-sql"
      packBlurb="The full sql pack catalogs every statement and table and flags migration hazards."
    >
      <SqlSafetyClient />
    </ToolShell>
  );
}
