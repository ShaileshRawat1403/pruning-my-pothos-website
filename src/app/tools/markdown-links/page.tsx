import { redirect } from "next/navigation";

// Retired: Markdown Link Checker overlapped too closely with lychee /
// markdown-link-check to earn its own card. Redirects rather than 404s in
// case anyone bookmarked it.
export default function MarkdownLinksPage() {
  redirect("/tools");
}
