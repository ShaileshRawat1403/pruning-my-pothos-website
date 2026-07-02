import ToolShell from "../../../components/ToolShell";
import TodoTriageClient from "../../../components/TodoTriageClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "TODO Triage",
  description: "Turn TODO, FIXME, HACK, XXX, and BUG markers into a triaged, owner-grouped backlog. Runs in your browser.",
  path: "/tools/todo-triage",
});

export default function TodoTriagePage() {
  return (
    <ToolShell
      eyebrow="Code Hygiene"
      title="TODO Triage"
      intro="Paste source or notes. Every TODO, FIXME, HACK, XXX, and BUG marker becomes a triaged line, with owners pulled from TODO(name) syntax. The backlog you kept pretending you did not have. Nothing is uploaded."
      accent="var(--accent-amber)"
      pack="tesserakit-todo"
      packBlurb="The full todo pack scans a whole codebase into a triaged, owner-grouped backlog."
    >
      <TodoTriageClient />
    </ToolShell>
  );
}
