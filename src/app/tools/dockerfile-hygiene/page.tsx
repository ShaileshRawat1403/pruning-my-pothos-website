import ToolShell from "../../../components/ToolShell";
import DockerfileHygieneClient from "../../../components/DockerfileHygieneClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Dockerfile Hygiene",
  description: "Lint a Dockerfile for image hygiene and security: latest tags, root user, secrets baked into layers, ADD vs COPY, missing healthcheck. Runs in your browser.",
  path: "/tools/dockerfile-hygiene",
});

export default function DockerfileHygienePage() {
  return (
    <ToolShell
      eyebrow="Security & Secrets"
      title="Dockerfile Hygiene"
      intro="Paste a Dockerfile. It flags unpinned base images, containers running as root, secrets baked into image layers, risky ADD and pipe-to-shell steps, and a missing healthcheck. Nothing is uploaded."
      accent="var(--accent-cyan)"
      pack="tesserakit-dockerfile"
      packBlurb="The full dockerfile pack checks image hygiene and security across your build."
    >
      <DockerfileHygieneClient />
    </ToolShell>
  );
}
