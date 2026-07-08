import { redirect } from "next/navigation";

// Retired: Dockerfile Hygiene overlapped too closely with the established
// hadolint linter to earn its own card. Redirects rather than 404s in case
// anyone bookmarked it.
export default function DockerfileHygienePage() {
  redirect("/tools");
}
