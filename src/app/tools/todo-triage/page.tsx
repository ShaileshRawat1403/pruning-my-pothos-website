import { redirect } from "next/navigation";

// Retired: TODO Triage was a commodity category with many free equivalents.
// Redirects rather than 404s in case anyone bookmarked it.
export default function TodoTriagePage() {
  redirect("/tools");
}
