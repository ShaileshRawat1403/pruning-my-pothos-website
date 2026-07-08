import ToolShell from "../../../components/ToolShell";
import WorkflowGovernanceClient from "../../../components/WorkflowGovernanceClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Workflow Governance Check",
  description: "Validate a JobPack workflow's review gates, recursion fence, and evidence policy: the governance schema, not the model, is what makes an AI workflow accountable. Runs in your browser.",
  path: "/tools/workflow-governance",
});

export default function WorkflowGovernancePage() {
  return (
    <ToolShell
      eyebrow="Governance & Orchestration"
      title="Workflow Governance Check"
      intro="Paste a Workflow Pack YAML. It checks that every review gate references a real step, that a recursion fence is declared, that at least one step has a hash-invariant evidence policy, and that promotion rules aren't silently ungated. Nothing is uploaded."
      accent="var(--accent-purple)"
      pack="tesserakit-workflow"
      packBlurb="The full workflow pack is the governance schema that sits on top of the Tessera JobPack contract: deterministic execution semantics for otherwise stochastic steps."
    >
      <WorkflowGovernanceClient />
    </ToolShell>
  );
}
