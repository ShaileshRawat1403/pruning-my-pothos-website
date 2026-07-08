import { redirect } from "next/navigation";

// Retired: Commits to Changelog overlapped too closely with
// conventional-changelog / git-cliff / semantic-release to earn its own
// card. Redirects rather than 404s in case anyone bookmarked it.
export default function ChangelogPage() {
  redirect("/tools");
}
